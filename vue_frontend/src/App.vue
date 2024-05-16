<script setup>
import router from './main';
import NavBar from "./components/Nav.vue";
import Footer from "./components/Footer.vue"
</script>

<template>
  <div></div>
  <NavBar />
  <router-view />
  <Footer />
</template>

<style scoped></style>
