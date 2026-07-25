<!-- src/views/Gallery.vue -->
<script setup>
import { ref, reactive } from "vue";
import { byYear, highlightPhoto, imageUrl } from "../constants/gallery";
import { useHead } from "@vueuse/head";

const years = byYear();
const rowRefs = ref({});
const loaded = reactive({});

function setRowRef(el, year) {
  if (el) rowRefs.value[year] = el;
}

function scrollRight(year) {
  const row = rowRefs.value[year];
  if (row) row.scrollBy({ left: row.clientWidth * 0.8, behavior: "smooth" });
}

function markLoaded(slug) {
  loaded[slug] = true;
}

const showHint = ref(false);
const hintX = ref(0);
const hintY = ref(0);
const HINT_OFFSET_X = 16;
const HINT_OFFSET_Y = 20;

function handleCardEnter(e) {
  showHint.value = true;
  hintX.value = e.clientX + HINT_OFFSET_X;
  hintY.value = e.clientY + HINT_OFFSET_Y;
}
function handleCardMove(e) {
  hintX.value = e.clientX + HINT_OFFSET_X;
  hintY.value = e.clientY + HINT_OFFSET_Y;
}
function handleCardLeave() {
  showHint.value = false;
}

useHead({
  meta: [
    { name: "description", content: "Photo gallery." },
    { property: "og:title", content: "Gallery" },
  ],
});
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 md:px-12 py-10">
    <h1
      class="mechsuit-font text-2xl font-bold text-blueish dark:text-secondary mb-2"
    >
      Gallery
    </h1>
    <p class="text-gray-600 dark:text-gray-400 mb-8">
      I am not a photographer. Everything captured on my Iphone 13.
    </p>

    <div v-for="[year, yearCollections] in years" :key="year" class="mb-6">
      <h2 class="text-2xl font-bold text-primary dark:text-tertiary mb-4">
        {{ year }}
      </h2>

      <div class="relative">
        <div
          :ref="(el) => setRowRef(el, year)"
          class="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
        >
          <router-link
            v-for="collection in yearCollections"
            :key="collection.slug"
            :to="`/gallery/${collection.year}/${collection.slug}`"
            class="flex-shrink-0 w-48 md:w-56 group relative overflow-hidden rounded-sm aspect-[3/4] bg-gray-200 dark:bg-white/5"
            @mouseenter="handleCardEnter"
            @mousemove="handleCardMove"
            @mouseleave="handleCardLeave"
          >
            <!-- Skeleton: visible until this card's image fires @load -->
            <div
              v-if="!loaded[collection.slug]"
              class="absolute inset-0 animate-pulse bg-slate/50 dark:bg-darker_slate"
            ></div>

            <img
              :src="imageUrl(highlightPhoto(collection))"
              :alt="highlightPhoto(collection).caption"
              loading="lazy"
              @load="markLoaded(collection.slug)"
              class="absolute inset-0 w-full h-full object-cover transition-all duration-500 grayscale-0 group-hover:grayscale group-hover:scale-105"
              :class="loaded[collection.slug] ? 'opacity-100' : 'opacity-0'"
            />

            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500"
            ></div>

            <div
              class="absolute inset-0 flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            >
              <p class="text-white text-center text-lg drop-shadow-md">
                {{ collection.title }}
              </p>
            </div>
          </router-link>
        </div>

        <!-- Mobile-only scroll arrow -->
        <button
          @click="scrollRight(year)"
          class="md:hidden absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 dark:bg-darker_slate/90 shadow-md text-primary dark:text-white"
          aria-label="Scroll to see more"
        >
          <i class="fas fa-chevron-right text-sm"></i>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="showHint"
        class="fixed z-50 pointer-events-none px-3 py-1 rounded-sm border border-magenta/60 dark:border-tertiary/60 bg-light dark:bg-darker_slate text-xs font-semibold text-magenta dark:text-tertiary shadow-md whitespace-nowrap transition-opacity duration-150"
        :style="{ left: `${hintX}px`, top: `${hintY}px` }"
      >
        View Gallery →
      </div>
    </Teleport>
  </div>
</template>
