<!-- src/views/About.vue -->
<template>
  <div class="mx-auto">
    <div
      class="flex flex-col max-h-screen mt-4 md:mt-8 align-center items-center justify-center"
    >
      <h1
        class="mechsuit-font text-center text-8xl md:text-10xl text-blueish dark:text-purple mt-24 mb-8"
      >
        About
      </h1>
      <router-link
        to="/"
        class="text-center link-underline text-xl hover:cursor-pointer text-magenta hover:text-violet dark:text-tertiary dark:hover:text-secondary"
        >Back To Home</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { useHead } from "@vueuse/head";
import GlitchText from "../components/GlitchText.vue";

useHead({
  meta: [
    {
      name: "description",
      content: "About Me",
    },
    {
      property: "og:description",
      content: "A little bit about me.",
    },
    { property: "og:title", content: "About Me" },
    { property: "og:image", content: "https://vitejs.dev/logo.svg" }, // temp logo image
  ],
});
</script>

<style scoped></style>
