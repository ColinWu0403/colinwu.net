<!-- src/views/GalleryPost.vue -->
<script setup>
import { computed, ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import {
  findCollection,
  orderedCollections,
  imageUrl,
} from "../constants/gallery";
import CursorTooltip from "../components/CursorTooltip.vue";

const route = useRoute();
const tooltip = ref(null);
const loaded = reactive({});

function markLoaded(url) {
  loaded[url] = true;
}

const collection = computed(() =>
  findCollection(route.params.year, route.params.slug),
);

const currentIndex = computed(() =>
  orderedCollections.findIndex(
    (c) =>
      String(c.year) === String(route.params.year) &&
      c.slug === route.params.slug,
  ),
);

const prevCollection = computed(() =>
  currentIndex.value > 0 ? orderedCollections[currentIndex.value - 1] : null,
);
const nextCollection = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < orderedCollections.length - 1
    ? orderedCollections[currentIndex.value + 1]
    : null,
);

// Desktop
const topBlurRef = ref(null);
const bottomBlurRef = ref(null);

function handleScroll(e) {
  const el = e.target;
  if (topBlurRef.value) {
    topBlurRef.value.style.opacity = Math.min(el.scrollTop / 100, 1);
  }
  if (bottomBlurRef.value) {
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    bottomBlurRef.value.style.opacity = Math.min(distanceFromBottom / 100, 1);
  }
}

// Mobile
const mobileTopBlurRef = ref(null);
const mobileBottomBlurRef = ref(null);
const mobileImagesRef = ref(null);

function handleWindowScroll() {
  const wrapper = mobileImagesRef.value;
  if (!wrapper) return;
  const rect = wrapper.getBoundingClientRect();

  // Fade in once the top of the image list has scrolled above the viewport top
  if (mobileTopBlurRef.value) {
    const scrolledPast = Math.max(0, -rect.top);
    mobileTopBlurRef.value.style.opacity = Math.min(scrolledPast / 100, 1);
  }

  // Fade out as the bottom of the image list approaches the viewport bottom
  if (mobileBottomBlurRef.value) {
    const distanceFromBottom = rect.bottom - window.innerHeight;
    const opacity =
      distanceFromBottom > 100 ? 1 : Math.max(0, distanceFromBottom / 100);
    mobileBottomBlurRef.value.style.opacity = opacity;
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleWindowScroll, { passive: true });
  handleWindowScroll();
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleWindowScroll);
});
</script>

<template>
  <div
    v-if="collection"
    class="md:h-full md:overflow-hidden flex flex-col md:flex-row w-full px-6 md:pl-16 md:pr-56 py-6 md:py-8 gap-10"
  >
    <!-- Left column -->
    <div class="md:w-72 md:h-full flex-shrink-0 flex flex-col items-start">
      <h1 class="text-3xl font-bold text-primary dark:text-white mb-2">
        {{ collection.title }}
      </h1>
      <p
        v-if="collection.description"
        class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 md:mb-8"
      >
        {{ collection.description }}
      </p>

      <!-- Mobile -->
      <div class="flex md:hidden items-center gap-8 md:mb-6 w-full">
        <router-link
          v-if="prevCollection"
          :to="`/gallery/${prevCollection.year}/${prevCollection.slug}`"
          class="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400"
        >
          <i class="fas fa-arrow-left text-xs"></i> Prev
        </router-link>
        <router-link
          v-if="nextCollection"
          :to="`/gallery/${nextCollection.year}/${nextCollection.slug}`"
          class="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400"
        >
          Next <i class="fas fa-arrow-right text-xs"></i>
        </router-link>
      </div>

      <!-- Desktop prev/next -->
      <div class="hidden md:flex md:flex-row items-center gap-48">
        <router-link
          v-if="nextCollection"
          :to="`/gallery/${nextCollection.year}/${nextCollection.slug}`"
          class="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-magenta dark:hover:text-tertiary transition"
        >
          <i class="fas fa-arrow-left text-xs"></i> Next
        </router-link>
        <router-link
          v-if="prevCollection"
          :to="`/gallery/${prevCollection.year}/${prevCollection.slug}`"
          class="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-magenta dark:hover:text-tertiary transition"
        >
          Prev <i class="fas fa-arrow-right text-xs"></i>
        </router-link>
      </div>

      <!-- Desktop back-to-gallery: pinned to the bottom of this column -->
      <div class="hidden md:inline-block mt-auto">
        <router-link
          to="/gallery"
          class="link-underline text-blueish dark:text-secondary hover:text-magenta dark:hover:text-tertiary text-sm"
        >
          &larr; Back to Gallery
        </router-link>
      </div>
    </div>

    <!-- Right column -->
    <div class="relative md:w-[560px] mx-auto md:h-full w-full">
      <!-- Desktop top blur -->
      <div
        ref="topBlurRef"
        class="hidden md:block pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-32 z-10 opacity-0"
      >
        <div
          class="absolute inset-0"
          style="
            mask-image: linear-gradient(to bottom, black 0%, transparent 60%);
            -webkit-mask-image: linear-gradient(
              to bottom,
              black 0%,
              transparent 60%
            );
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
          "
        ></div>
        <div
          class="absolute inset-0"
          style="
            mask-image: linear-gradient(to bottom, black 0%, transparent 40%);
            -webkit-mask-image: linear-gradient(
              to bottom,
              black 0%,
              transparent 40%
            );
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
          "
        ></div>
        <div
          class="absolute inset-0"
          style="
            mask-image: linear-gradient(to bottom, black 0%, transparent 25%);
            -webkit-mask-image: linear-gradient(
              to bottom,
              black 0%,
              transparent 25%
            );
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
          "
        ></div>
        <div
          class="absolute inset-0"
          style="
            mask-image: linear-gradient(to bottom, black 0%, transparent 15%);
            -webkit-mask-image: linear-gradient(
              to bottom,
              black 0%,
              transparent 15%
            );
            backdrop-filter: blur(32px);
            -webkit-backdrop-filter: blur(32px);
          "
        ></div>
      </div>

      <!-- Mobile top blur: fixed to viewport, since page (not a container) scrolls -->
      <div
        ref="mobileTopBlurRef"
        class="md:hidden pointer-events-none fixed top-0 inset-x-0 h-24 z-10 opacity-0"
      >
        <div
          class="absolute inset-0"
          style="
            mask-image: linear-gradient(to bottom, black 0%, transparent 60%);
            -webkit-mask-image: linear-gradient(
              to bottom,
              black 0%,
              transparent 60%
            );
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
          "
        ></div>
        <div
          class="absolute inset-0"
          style="
            mask-image: linear-gradient(to bottom, black 0%, transparent 40%);
            -webkit-mask-image: linear-gradient(
              to bottom,
              black 0%,
              transparent 40%
            );
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
          "
        ></div>
        <div
          class="absolute inset-0"
          style="
            mask-image: linear-gradient(to bottom, black 0%, transparent 25%);
            -webkit-mask-image: linear-gradient(
              to bottom,
              black 0%,
              transparent 25%
            );
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
          "
        ></div>
        <div
          class="absolute inset-0"
          style="
            mask-image: linear-gradient(to bottom, black 0%, transparent 15%);
            -webkit-mask-image: linear-gradient(
              to bottom,
              black 0%,
              transparent 15%
            );
            backdrop-filter: blur(32px);
            -webkit-backdrop-filter: blur(32px);
          "
        ></div>
      </div>

      <!-- Images -->
      <div
        ref="mobileImagesRef"
        class="no-scrollbar md:h-full md:overflow-y-auto space-y-2"
        @scroll="handleScroll"
      >
        <div
          v-for="photo in collection.photos"
          :key="photo.url"
          class="group relative overflow-hidden rounded-xs"
          @mouseenter="(e) => tooltip.show(e, photo.caption)"
          @mousemove="(e) => tooltip.move(e)"
          @mouseleave="() => tooltip.hide()"
        >
          <!-- Loading Skeleton -->
          <div
            v-if="!loaded[photo.url]"
            class="aspect-[3/4] animate-pulse bg-slate/50 dark:bg-darker_slate"
          ></div>
          <img
            :src="imageUrl(photo, 1100, 90)"
            :alt="photo.caption"
            loading="lazy"
            @load="markLoaded(photo.url)"
            class="w-full transition-opacity duration-500"
            :class="
              loaded[photo.url] ? 'opacity-100' : 'opacity-0 absolute inset-0'
            "
          />
          <div class="absolute inset-0"></div>
        </div>
      </div>

      <!-- Desktop bottom blur -->
      <div
        ref="bottomBlurRef"
        class="hidden md:block pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[720px] h-32 z-10"
      >
        <div
          class="absolute inset-0"
          style="
            mask-image: linear-gradient(to top, black 0%, transparent 60%);
            -webkit-mask-image: linear-gradient(
              to top,
              black 0%,
              transparent 60%
            );
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
          "
        ></div>
        <div
          class="absolute inset-0"
          style="
            mask-image: linear-gradient(to top, black 0%, transparent 40%);
            -webkit-mask-image: linear-gradient(
              to top,
              black 0%,
              transparent 40%
            );
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
          "
        ></div>
        <div
          class="absolute inset-0"
          style="
            mask-image: linear-gradient(to top, black 0%, transparent 25%);
            -webkit-mask-image: linear-gradient(
              to top,
              black 0%,
              transparent 25%
            );
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
          "
        ></div>
        <div
          class="absolute inset-0"
          style="
            mask-image: linear-gradient(to top, black 0%, transparent 15%);
            -webkit-mask-image: linear-gradient(
              to top,
              black 0%,
              transparent 15%
            );
            backdrop-filter: blur(32px);
            -webkit-backdrop-filter: blur(32px);
          "
        ></div>
      </div>

      <!-- Mobile bottom blur -->
      <div
        ref="mobileBottomBlurRef"
        class="md:hidden pointer-events-none fixed bottom-0 inset-x-0 h-24 z-10"
      >
        <div
          class="absolute inset-0"
          style="
            mask-image: linear-gradient(to top, black 0%, transparent 60%);
            -webkit-mask-image: linear-gradient(
              to top,
              black 0%,
              transparent 60%
            );
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
          "
        ></div>
        <div
          class="absolute inset-0"
          style="
            mask-image: linear-gradient(to top, black 0%, transparent 40%);
            -webkit-mask-image: linear-gradient(
              to top,
              black 0%,
              transparent 40%
            );
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
          "
        ></div>
        <div
          class="absolute inset-0"
          style="
            mask-image: linear-gradient(to top, black 0%, transparent 25%);
            -webkit-mask-image: linear-gradient(
              to top,
              black 0%,
              transparent 25%
            );
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
          "
        ></div>
        <div
          class="absolute inset-0"
          style="
            mask-image: linear-gradient(to top, black 0%, transparent 15%);
            -webkit-mask-image: linear-gradient(
              to top,
              black 0%,
              transparent 15%
            );
            backdrop-filter: blur(32px);
            -webkit-backdrop-filter: blur(32px);
          "
        ></div>
      </div>
    </div>

    <!-- Mobile back-to-gallery -->
    <div class="md:hidden inline-block mt-auto">
      <router-link
        to="/gallery"
        class="link-underline text-blueish dark:text-secondary hover:text-magenta dark:hover:text-tertiary text-sm"
      >
        &larr; Back to Gallery
      </router-link>
    </div>
  </div>

  <p
    v-else
    class="max-w-4xl mx-auto px-6 md:px-12 py-10 text-primary dark:text-white"
  >
    Collection not found.
  </p>

  <CursorTooltip ref="tooltip" :bordered="false" :icon="false" />
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
