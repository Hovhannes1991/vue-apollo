<template>
  <TheNavbar />
  <RouterView></RouterView>
</template>

<script>
import TheNavbar from './pages/navbar/TheNavbar.vue';

export default {
    name: "App",
    components: { TheNavbar }
};
</script>
