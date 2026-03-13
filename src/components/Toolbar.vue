<script setup lang="ts">
import { IconEraser, IconPencil, IconPencilCog, IconPlayerPlay } from '@tabler/icons-vue';
import { useAppState } from '../AppState';
import ColorButton from './ColorButton.vue'
import DropdownMenu from './DropdownMenu.vue';

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
    <DropdownMenu>
      <template #button-content>
        <IconPencilCog></IconPencilCog>
      </template>
      <template #default>
        <button @click="appState.lineWeight = 0.005" :class="{ selected: appState.lineWeight === 0.005 }">tiny</button>
        <button @click="appState.lineWeight = 0.01" :class="{ selected: appState.lineWeight === 0.01 }">small</button>
        <button @click="appState.lineWeight = 0.02" :class="{ selected: appState.lineWeight === 0.02 }">regular</button>
        <button @click="appState.lineWeight = 0.04" :class="{ selected: appState.lineWeight === 0.04 }">medium</button>
        <button @click="appState.lineWeight = 0.08" :class="{ selected: appState.lineWeight === 0.08 }">large</button>
        <button @click="appState.lineWeight = 0.16" :class="{ selected: appState.lineWeight === 0.16 }">big</button>
        <button @click="appState.lineWeight = 0.32"
          :class="{ selected: appState.lineWeight === 0.32 }">humongous</button>
      </template>
    </DropdownMenu>

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

button.selected {
  font-weight: bold;
  text-decoration: underline;
}
</style>
