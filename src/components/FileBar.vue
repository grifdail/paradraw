<script setup lang="ts">
import { IconFile } from '@tabler/icons-vue';
import { useAppState } from '../AppState';

//defineProps<{ msg: string }>()
const appState = useAppState();

const randomAspectRatio = () => [1, 1.618033988749894, 1 / 1.618033988749894][Math.floor(Math.random() * 3)] as number
</script>

<template>
    <div class="root">
        <button @click="appState.newSketch(randomAspectRatio())">
            <IconFile />
        </button>



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
