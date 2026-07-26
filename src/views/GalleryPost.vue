<!-- src/views/GalleryPost.vue -->
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { findCollection, imageUrl } from "../constants/gallery";

const route = useRoute();
const collection = computed(() =>
  findCollection(route.params.year, route.params.slug),
);
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 md:px-12 py-10">
    <router-link to="/gallery" class="text-secondary text-sm">
      &larr; Back to Gallery
    </router-link>

    <div v-if="collection">
      <h1 class="text-2xl font-bold text-primary dark:text-white mt-4 mb-6">
        {{ collection.title }} — {{ collection.year }}
      </h1>
      <div class="space-y-6">
        <img
          v-for="photo in collection.photos"
          :key="photo.url"
          :src="imageUrl(photo, 1400)"
          :alt="photo.caption"
          loading="lazy"
          class="w-full rounded-lg"
        />
      </div>
    </div>
    <p v-else class="mt-8 text-primary dark:text-white">
      Collection not found.
    </p>
  </div>
</template>
