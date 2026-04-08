<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavBar from "./components/Nav.vue";
import Footer from "./components/Footer.vue";

const route = useRoute();
const hidecomponent = computed(() => route.meta.hideComponent);
</script>

<template>
  <NavBar v-if="!hidecomponent" />
  <router-view />
  <Footer v-if="!hidecomponent" />
</template>

<style scoped></style>
