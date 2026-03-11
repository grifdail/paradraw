<script setup lang="ts">
import { IconCircleFilled, IconPalette } from '@tabler/icons-vue';
import { computed, ref, useId, useTemplateRef } from 'vue';
import { SketchPicker } from 'vue-color';
import { DefaultPalettes } from '../data/palettes';

const model = defineModel({ required: true })


const popover = useTemplateRef('popover');
const toggle = (e: PointerEvent) => {
    if (popover.value && e.target) {
        popover.value.showPopover({ source: e.target as HTMLElement })
    }
}


const id = `--${useId()}`
console.log(id);

const selectedPaletteId = ref<keyof typeof DefaultPalettes>("Pico8")
const selectedPalette = computed(() => DefaultPalettes[selectedPaletteId.value])

</script>

<template>
    <button @click="toggle" :style="{ anchorName: id }">
        <IconCircleFilled :color="modelValue"></IconCircleFilled>
    </button>
    <div class="popover dark" popover ref="popover" :style="{ positionAnchor: id }">
        <SketchPicker v-model="model" :preset-colors="selectedPalette"></SketchPicker>
        <div class="palette-select">
            <IconPalette></IconPalette>
            <select v-model="selectedPaletteId">
                <option v-for="id in Object.keys(DefaultPalettes)" :value="id">{{ id }}</option>
            </select>
        </div>

    </div>
</template>

<style lang="css" scoped>
.popover {
    margin: 0;
    inset: auto;
    position-area: top center;
    position: fixed;
    border: none;
    padding: var(--size-03);
    background: var(--white);
    border-radius: var(--border-radius-3);
    overflow-x: hidden;

    & .vc-sketch-picker {
        border: none;
        background-color: transparent;
        padding: 0;
        box-shadow: none;
    }

    & .palette-select {
        display: flex;
        color: var(--black);

        gap: var(--size-03);
        justify-content: stretch;

        & select {
            flex: 1 1 auto;
            justify-self: stretch;
            background: white;
            border: none;
            color: var(--black);
        }
    }


}
</style>