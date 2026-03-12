<script setup lang="ts">
import { IconDownload, IconFile, IconFileExport, IconInfoCircle } from '@tabler/icons-vue';
import { useAppState } from '../AppState';
import DropdownMenu from './DropdownMenu.vue';
import PopoverPanel from './PopoverPanel.vue';
import AboutPopup from './AboutPopup.vue'

//defineProps<{ msg: string }>()
const appState = useAppState();

const RATIO_SQUARE = 1;
const RATIO_LANDSCAPE = 1 / 1.618033988749894;
const RATIO_PORTRAIT = 1.618033988749894;

</script>

<template>
    <div class="root">
        <DropdownMenu>
            <template #button-content>
                <IconFile></IconFile>
            </template>
            <template #default>
                <button @click="appState.newSketch(RATIO_SQUARE)">Square</button>
                <button @click="appState.newSketch(RATIO_PORTRAIT)">Portrait</button>
                <button @click="appState.newSketch(RATIO_LANDSCAPE)">Landscape</button>
            </template>
        </DropdownMenu>
        <span>
            <h1>Paradraw</h1>
            <AboutPopup />
        </span>
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

    &>button {
        aspect-ratio: 1;

    }

    &>span {
        text-align: center;
        display: flex;
        align-items: baseline;
        justify-content: center;
        gap: var(--size-03);

        &:deep(button) {
            background: transparent;
            border: none;
        }
    }
}
</style>
