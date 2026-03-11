<script setup lang="ts">
import Canvas from './components/Canvas.vue'
import FileBar from './components/FileBar.vue';
import FrameSlider from './components/FrameSlider.vue';
import Toolbar from './components/Toolbar.vue'
</script>

<template>
  <FileBar></FileBar>
  <div>
    <Canvas></Canvas>
  </div>
  <FrameSlider />
  <Toolbar />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
