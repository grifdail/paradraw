<script setup lang="ts">
import { IconEraser, IconPencil, IconPlayerPlay } from '@tabler/icons-vue';
import { useAppState } from '../AppState';
import ColorButton from './ColorButton.vue'

//defineProps<{ msg: string }>()
const appState = useAppState();
</script>

<template>
  <div class="root">
    <button v-tooltip title="Preview" :disabled="appState.mode === 'view'" @click="appState.mode = 'view'">
      <IconPlayerPlay />
    </button>
    <button v-tooltip title="Draw" :disabled="appState.mode === 'draw'" @click="appState.mode = 'draw'">
      <IconPencil />
    </button>
    <button v-tooltip title="Erase" :disabled="appState.mode === 'erase'" @click="appState.mode = 'erase'">
      <IconEraser />
    </button>
    <hr>
    <input :disabled="appState.mode !== 'draw'" v-tooltip
      :title="`Line Weight ${(appState.lineWeight * 100).toFixed(1)}%`" type="range" v-model="appState.lineWeight"
      min="0" max="0.3" step="0.005" />
    <ColorButton :disabled="appState.mode !== 'draw'" v-tooltip title="Pen Color" v-model="appState.color" />

  </div>
</template>


<style scoped>
.root {
  align-self: stretch;
  display: flex;
  flex-direction: row;
  justify-content: stretch;

  gap: var(--size-03);

  & hr {
    border: none;
    background: transparent;
    flex: 1 1;
  }
}
</style>
