<script setup lang="ts">
import { computed, reactive, ref, useTemplateRef } from 'vue'
import { useAppState } from '../AppState';
import { optimizePoints, pathToSVG } from '../utils';
import { useEventListener } from '@vueuse/core';

//defineProps<{ msg: string }>()
const appState = useAppState();
const relativeHeight = computed(() => appState.sketch.aspectRatio);
const actualWidth = 400;
const actualHeight = computed(() => 400 * relativeHeight.value);
const viewBox = computed(() => `0 0 1 ${relativeHeight.value}`)

const svg = useTemplateRef('svg')
const newLine = reactive<number[]>([])
const isMouseDown = ref<boolean>(false);

const pointerDown = (e:PointerEvent) => {
  isMouseDown.value = true;
  const pos = getPointerPosition(e)
  if (pos && appState.tool==="draw") {
    newLine.splice(0)
    newLine.push(pos.x, pos.y)
  }
};


const pointerMove = (e:PointerEvent) => {
  const pos = getPointerPosition(e)
  if (pos && newLine.length>0) {
    newLine.push(pos.x, pos.y)
  }
};

const pointerUp = (e:PointerEvent) => {
  isMouseDown.value = false;
  const pos = getPointerPosition(e)
  if (pos && newLine.length>0) {
     newLine.push(pos.x, pos.y)
     const item = newLine.slice();
     const optimized = optimizePoints(item);
     appState.addLine(optimized)
     newLine.splice(0);
  }
};

const getPointerPosition = (e:PointerEvent) => {
      const rect = svg.value?.getBoundingClientRect();
    if (!rect) {
      return undefined;
    }
    var pos = {
      x: (e.clientX-rect.left)/rect.width,
      y: (e.clientY-rect.top)/rect.width
    }
    return pos;
}
const eraseLine = (line:number, layer:number, cancel:boolean= false) => {
  if (appState.tool==="erase" && appState.editedFrame === layer && !cancel) {
    appState.eraseLine(line, layer)
  }
}



  useEventListener("pointermove",pointerMove)
  useEventListener("pointerup",pointerUp)

</script>

<template>
  <svg ref="svg" class="canvas" :viewBox="viewBox" :width="actualWidth" :height="actualHeight" 
    @pointerdown="pointerDown"
   

    >
    <g v-for="(layer, layerIndex) in appState.sketch.frames">
      <path v-for="(line, lineIndex) in layer.lines" 
        @click="eraseLine(lineIndex, layerIndex)"  
        @pointerenter="eraseLine(lineIndex, layerIndex, !isMouseDown)"
        :d="pathToSVG(line.points)" 
        fill="none"  
        :stroke="line.color"  
        :stroke-width="line.weight" 
        stroke-linecap="round"
         stroke-linejoin="round"/>
    </g>
      <path :d="pathToSVG(newLine)" 
      fill="none" 
      :stroke="appState.color" 
      :stroke-width="appState.lineWeight" 
      stroke-linecap="round" 
      stroke-linejoin="round"
      ></path>
      
  </svg>

</template>

<style scoped>
.canvas {
  border: 2px solid red;
  background: 
    repeating-conic-gradient(#808080 0 25%, #0000 0 50%) 
      50% / 20px 20px
}
</style>


