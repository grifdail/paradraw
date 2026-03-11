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
                :style="{ left: `${(frame.position * 0.5 + 0.5) * 100}%` }"></div>
        </div>
        <button @click="appState.addFrame()">Add <IconPlus></IconPlus> </button>
    </div>

</template>


<style scoped>
.root {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.bar {
    position: relative;
    width: 400px;
    min-height: 50px;
    padding: 0%;
    margin: 0;
    background: rgba(0, 0, 0, 0.1);
    ;
}

.bar-visual {
    top: 8px;
    width: 100%;
    height: 4px;
    background: red;
    position: absolute;
}

.label {
    width: 25px;
    height: 25px;
    top: 10px;
    position: absolute;
    background: blue;
    transform: translate(-50%, -50%);

    &.selected {
        background: pink;
    }
}
</style>
