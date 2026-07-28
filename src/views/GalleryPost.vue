<!-- src/views/GalleryPost.vue -->
<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import {
  findCollection,
  orderedCollections,
  imageUrl,
} from "../constants/gallery";
import CursorTooltip from "../components/CursorTooltip.vue";

const route = useRoute();
const tooltip = ref(null);

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

const topBlurRef = ref(null);

function handleScroll(e) {
  if (!topBlurRef.value) return;
  const opacity = Math.min(e.target.scrollTop / 100, 1);
  topBlurRef.value.style.opacity = opacity;
}
</script>

<template>
  <div
    v-if="collection"
    class="md:h-full md:overflow-hidden flex flex-col md:flex-row w-full px-6 md:pl-16 md:pr-8 py-6 md:py-8 gap-10"
  >
    <!-- Left column -->
    <div class="md:w-64 flex-shrink-0 flex flex-col items-start">
      <h1 class="text-3xl font-bold text-primary dark:text-white mb-2">
        {{ collection.title }}
      </h1>
      <p
        v-if="collection.description"
        class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6"
      >
        {{ collection.description }}
      </p>

      <div class="hidden md:flex items-center gap-4 mb-4">
        <router-link
          v-if="prevCollection"
          :to="`/gallery/${prevCollection.year}/${prevCollection.slug}`"
          class="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-magenta dark:hover:text-tertiary transition"
        >
          <i class="fas fa-arrow-left text-xs"></i> Prev
        </router-link>
        <router-link
          v-if="nextCollection"
          :to="`/gallery/${nextCollection.year}/${nextCollection.slug}`"
          class="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-magenta dark:hover:text-tertiary transition"
        >
          Next <i class="fas fa-arrow-right text-xs"></i>
        </router-link>
      </div>

      <router-link
        to="/gallery"
        class="link-underline inline-block text-blueish dark:text-secondary hover:text-magenta dark:hover:text-tertiary text-sm"
      >
        &larr; Back to Gallery
      </router-link>
    </div>

    <!-- Right column -->
    <div class="relative md:w-[560px] mx-auto md:h-full">
      <!-- Top blur bar: fades in on scroll, matching their scroll-linked opacity -->
      <div
        ref="topBlurRef"
        class="hidden md:block pointer-events-none absolute inset-x-0 top-0 h-24 z-10 opacity-0"
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

      <div
        ref="scrollContainerRef"
        class="no-scrollbar md:h-full md:overflow-y-auto space-y-2"
        @scroll="handleScroll"
      >
        <div
          v-for="photo in collection.photos"
          :key="photo.url"
          class="group relative overflow-hidden rounded-sm"
          @mouseenter="(e) => tooltip.show(e, photo.caption)"
          @mousemove="(e) => tooltip.move(e)"
          @mouseleave="() => tooltip.hide()"
        >
          <img
            :src="imageUrl(photo, 1100, 90)"
            :alt="photo.caption"
            loading="lazy"
            class="w-full"
          />
          <div
            class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"
          ></div>
        </div>
      </div>

      <!-- Bottom blur bar: always visible, matching their reference exactly -->
      <div
        class="hidden md:block pointer-events-none absolute inset-x-0 bottom-0 h-24 z-10"
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

    <div class="md:hidden flex justify-between pt-4">
      <router-link
        v-if="prevCollection"
        :to="`/gallery/${prevCollection.year}/${prevCollection.slug}`"
        class="text-sm text-gray-600 dark:text-gray-400"
      >
        &larr; Prev
      </router-link>
      <router-link
        v-if="nextCollection"
        :to="`/gallery/${nextCollection.year}/${nextCollection.slug}`"
        class="text-sm text-gray-600 dark:text-gray-400"
      >
        Next &rarr;
      </router-link>
    </div>
  </div>

  <p
    v-else
    class="max-w-4xl mx-auto px-6 md:px-12 py-10 text-primary dark:text-white"
  >
    Collection not found.
  </p>

  <CursorTooltip ref="tooltip" :bordered="false" />
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
