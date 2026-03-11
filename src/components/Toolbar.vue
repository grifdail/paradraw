<script setup lang="ts">
import { IconEraser, IconPencil, IconPlayerPlay } from '@tabler/icons-vue';
import { useAppState } from '../AppState';
import ColorButton from './ColorButton.vue'

//defineProps<{ msg: string }>()
const appState = useAppState();
const item = appState;
</script>

<template>
  <div class="root">
    <button :disabled="appState.mode === 'view'" @click="appState.mode = 'view'">
      <IconPlayerPlay />
    </button>
    <button :disabled="appState.mode === 'draw'" @click="appState.mode = 'draw'">
      <IconPencil />
    </button>
    <button :disabled="appState.mode === 'erase'" @click="appState.mode = 'erase'">
      <IconEraser />
    </button>
    <input type="range" v-model="appState.lineWeight" min="0" max="0.3" step="0.005" />
    <ColorButton v-model="appState.color" />

  </div>
</template>


<style scoped>
.root {
  & button {
    aspect-ratio: 1;
    padding: 10px;
  }
}
</style>
