<script setup>
import { useRoute } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import "@fortawesome/fontawesome-free/css/all.css";

const route = useRoute();
</script>

<template>
  <div
    id="app"
    class="flex flex-col bg-light dark:bg-primary text-primary dark:text-white transition-colors duration-300"
    :class="
      route.meta.noScroll ? 'md:h-screen md:overflow-hidden' : 'min-h-screen'
    "
  >
    <!-- Main layout components -->
    <Navbar />
    <main
      class="flex-grow min-h-0"
      :class="route.meta.noScroll ? 'flex flex-col md:overflow-hidden' : ''"
    >
      <router-view />
    </main>
    <Footer v-if="!route.meta.noScroll" />
  </div>
</template>

<style>
/* Global styles */
</style>
