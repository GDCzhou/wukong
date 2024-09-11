<script setup lang="ts">
import MapView from './views/MapView.vue'
import SideBar from '@/views/SideBar.vue'


</script>

<template>
  <main class="container">
    <SideBar />
    <map-view />
  </main>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
}
</style>
