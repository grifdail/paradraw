<script setup lang="ts">
import { IconDownload, IconFile, IconFileExport, IconInfoCircle } from '@tabler/icons-vue';
import { useAppState } from '../AppState';

//defineProps<{ msg: string }>()
const appState = useAppState();

const randomAspectRatio = () => [1, 1.618033988749894, 1 / 1.618033988749894][Math.floor(Math.random() * 3)] as number
</script>

<template>
    <div class="root">
        <button v-tooltip title="New Sketch" @click="appState.newSketch(randomAspectRatio())">
            <IconFile />
        </button>
        <h1>Paradraw <IconInfoCircle></IconInfoCircle>
        </h1>
        <button v-tooltip title="Export (Not yet available)" disabled>
            <IconDownload />
        </button>
    </div>
</template>


<style scoped>
.root {
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    align-self: stretch;

    & button {
        aspect-ratio: 1;

    }

    & h1 {
        text-align: center;
        display: flex;
        align-items: baseline;
        justify-content: center;
        gap: var(--size-03);

    }
}
</style>
