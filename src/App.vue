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
    class="flex flex-col min-h-screen bg-light dark:bg-primary text-primary dark:text-white transition-colors duration-300"
  >
    <!-- Main layout components -->
    <Navbar />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer v-if="!route.meta.hideFooter" />
  </div>
</template>

<style>
/* Global styles */
</style>
