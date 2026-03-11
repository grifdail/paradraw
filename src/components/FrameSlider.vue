<script setup lang="ts">
import { IconEraser, IconLock, IconLockOpen, IconPencil, IconPlus } from '@tabler/icons-vue';
import { useAppState } from '../AppState';
import { ref, useTemplateRef } from 'vue';
import { clamp, getPointerPositionRelative } from '../utils';
import { useEventListener } from '@vueuse/core';

//defineProps<{ msg: string }>()
const appState = useAppState();
const origin = useTemplateRef('origin');
const selectedFrame = ref("")

const dragStart = (frame: string) => {
    selectedFrame.value = frame;
    appState.editedFrame = frame;
}

useEventListener("pointermove", (e: PointerEvent) => {
    var pos = getPointerPositionRelative(e, origin);
    if (selectedFrame.value && pos) {
        var p = clamp(pos.x * 2 - 1, -1, 1)
        appState.moveFrame(selectedFrame.value, p);
    }
})
useEventListener("pointerup", (e: PointerEvent) => {
    var pos = getPointerPositionRelative(e, origin);
    if (selectedFrame.value && pos) {
        console.log(pos);
        selectedFrame.value = "";
    }
})

</script>

<template>
    <div class="root">
        <div class="bar" ref="origin">
            <div class="bar-visual"></div>
            <div class="label" v-for="frame in appState.sketch.frames" @pointerdown="dragStart(frame.id)"
                :class="{ visible: frame.visible, selected: appState.editedFrame === frame.id }"
                :style="{ left: `${(frame.position * 0.5 + 0.5) * 100}%` }" v-tooltip
                :title="Math.round(frame.position * 100).toString()"></div>
        </div>
        <button @click="appState.addFrame()" v-tooltip title="Add a new Layer">
            <IconPlus></IconPlus>
        </button>
    </div>

</template>


<style scoped>
.root {
    align-self: stretch;
    justify-self: stretch;
    display: grid;
    grid-template-columns: 1fr max-content;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    ;

    gap: var(--size-03);

    --size: var(--size-07);

    .bar {
        position: relative;
        height: var(--size);
        padding: 0%;
        margin: 0;
        border-left: 4px solid var(--green-700);
        border-right: 4px solid var(--green-700);

        &::before {
            display: block;
            position: absolute;
            top: 0;
            left: calc(50% - 2px);
            width: 4px;
            height: 100%;
            background: var(--green-800);
            content: "";
        }

        .bar-visual {
            top: calc(50% - 2px);
            width: 100%;
            height: 4px;
            background: var(--green-700);
            position: absolute;
        }

        .label {
            width: var(--size);
            height: var(--size);
            border-radius: 50%;
            top: 0;
            position: absolute;
            background: var(--green-800);
            transform: translate(-50%, 0);

            cursor: pointer;

            &.selected {
                background: var(--green-200);


                &::after {
                    display: block;
                    position: absolute;
                    top: 25%;
                    left: 25%;
                    width: 50%;
                    height: 50%;
                    background: var(--green-800);
                    border-radius: 50%;
                    content: "";
                }
            }


        }
    }


    & button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
}
</style>
