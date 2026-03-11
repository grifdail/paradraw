<script setup lang="ts">
import { IconCircleFilled } from '@tabler/icons-vue';
import { computed, ref, useTemplateRef } from 'vue';
import { SketchPicker } from 'vue-color';
import { DefaultPalettes } from '../data/palettes';

const model = defineModel({ required: true })


const popover = useTemplateRef('popover');
const toggle = () => {
    if (popover.value) {
        popover.value.showPopover({ source: popover.value })
    }
}

const selectedPaletteId = ref<keyof typeof DefaultPalettes>("Pico8")
const selectedPalette = computed(() => DefaultPalettes[selectedPaletteId.value])

</script>

<template>
    <button @click="toggle()">
        <IconCircleFilled :color="modelValue"></IconCircleFilled>
    </button>
    <div class="popover" popover ref="popover">
        <SketchPicker v-model="model" :preset-colors="selectedPalette"></SketchPicker>
        <select v-model="selectedPaletteId">
            <option v-for="id in Object.keys(DefaultPalettes)" :value="id">{{ id }}</option>
        </select>
    </div>
</template>

<style lang="css" scoped>
.popover {
    margin: 0;
    inset: auto;
    position-area: top center;

    border: none;
}
</style>