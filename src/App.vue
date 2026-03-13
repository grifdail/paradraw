<script setup lang="ts">
import Canvas from './components/Canvas.vue'
import FileBar from './components/FileBar.vue';
import FrameSlider from './components/FrameSlider.vue';
import Toolbar from './components/Toolbar.vue'
</script>

<template>
  <FileBar></FileBar>
  <Canvas></Canvas>
  <FrameSlider />
  <Toolbar />
</template>
