<script setup lang="ts">
import { IconCircleFilled, IconPalette } from '@tabler/icons-vue';
import { computed, ref } from 'vue';
import { SketchPicker } from 'vue-color';
import { DefaultPalettes } from '../data/palettes';
import PopoverPanel from './PopoverPanel.vue';

const model = defineModel({ required: true })

const selectedPaletteId = ref<keyof typeof DefaultPalettes>("Pico8")
const selectedPalette = computed(() => DefaultPalettes[selectedPaletteId.value])

</script>

<template>
    <PopoverPanel :class="`dark color-picker-popover`">
        <template #button-content>
            <IconCircleFilled :color="modelValue"></IconCircleFilled>
        </template>
        <template #default>
            <SketchPicker v-model="model" :preset-colors="selectedPalette"></SketchPicker>
            <div class="palette-select">
                <IconPalette></IconPalette>
                <select v-model="selectedPaletteId">
                    <option v-for="id in Object.keys(DefaultPalettes)" :value="id">{{ id }}</option>
                </select>
            </div>
        </template>
    </PopoverPanel>

</template>

<style lang="css" scoped>
:global(.color-picker-popover) {

    border: none;
    background: var(--white);
    overflow-x: hidden;
}

.color-picker-popover .vc-sketch-picker {
    border: none;
    background-color: transparent;
    padding: 0;
    box-shadow: none;
}

.color-picker-popover .palette-select {
    display: flex;
    color: var(--black);

    gap: var(--size-03);
    justify-content: stretch;
}

.color-picker-popover .palette-select select {
    flex: 1 1 auto;
    justify-self: stretch;
    background: white;
    border: none;
    color: var(--black);

}
</style>