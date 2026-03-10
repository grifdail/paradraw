<script setup lang="ts">
import { IconEraser, IconLock, IconLockOpen, IconPencil } from '@tabler/icons-vue';
import { useAppState } from '../AppState';

//defineProps<{ msg: string }>()
const appState = useAppState();
const item =appState;
</script>

<template>
  <div>
    <button :disabled="appState.tool === 'draw'" @click="appState.tool = 'draw'"><IconPencil /></button>
    <button :disabled="appState.tool === 'erase'" @click="appState.tool = 'erase'"><IconEraser /></button>
    <input type="range" v-model="appState.lineWeight" min="0" max="0.3" step="0.005" />
    <input type="color" v-model="appState.color" />
    <button @click="appState.locked = !appState.locked"><IconLock v-if="appState.locked" /><IconLockOpen v-if="!appState.locked" /> </button>
  </div>
</template>

<style scoped>

</style>
