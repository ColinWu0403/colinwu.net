<!-- src/views/Gallery.vue -->
<script setup>
import { byYear, highlightPhoto, imageUrl } from "../constants/gallery";
import { useHead } from "@vueuse/head";

const years = byYear();

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
      class="mechsuit-font text-2xl font-bold text-blueish dark:text-secondary mb-8"
    >
      Gallery
    </h1>

    <div v-for="[year, yearCollections] in years" :key="year" class="mb-12">
      <h2 class="text-xl font-bold text-primary dark:text-white mb-4">
        {{ year }}
      </h2>

      <div class="flex gap-5 overflow-x-auto pb-2">
        <router-link
          v-for="collection in yearCollections"
          :key="collection.slug"
          :to="`/gallery/${collection.year}/${collection.slug}`"
          class="flex-shrink-0 w-64 group"
        >
          <div class="rounded-lg overflow-hidden">
            <img
              :src="imageUrl(highlightPhoto(collection), 500)"
              :alt="highlightPhoto(collection).alt"
              loading="lazy"
              class="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <p class="mt-2 font-semibold text-primary dark:text-white">
            {{ collection.title }}
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>
