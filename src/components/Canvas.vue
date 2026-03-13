<script setup lang="ts">
import { computed, reactive, ref, useTemplateRef, watch } from 'vue'
import { useAppState } from '../AppState';
import { clamp, clamp01, getPointerPositionRelative, optimizePoints, pathToSVG } from '../utils';
import { useDeviceMotion, useElementBounding, useEventListener, useWindowSize } from '@vueuse/core';

const EFFECT_STRENGTH = 0.1;
const SCREEN_DIMENSION = 600;
const MOUSE_MOVE_COOLDOWN = 1000;

const windowSize = useWindowSize();
const root = useTemplateRef("root")
const rootSize = useElementBounding(root);
const appState = useAppState();
const actualDimension = computed(() => {
  const aspectRatio = appState.sketch.aspectRatio;
  const isPortrait = aspectRatio > 1;
  const idealDimension = isPortrait ?
    { width: SCREEN_DIMENSION, height: SCREEN_DIMENSION * appState.sketch.aspectRatio } :
    { width: SCREEN_DIMENSION / appState.sketch.aspectRatio, height: SCREEN_DIMENSION };
  const finalDim = { ...idealDimension };
  const maxWidth = windowSize.width.value * 0.9;
  if (finalDim.width > maxWidth) {
    const scale = maxWidth / finalDim.width;
    finalDim.width *= scale;
    finalDim.height *= scale;
  }
  if (finalDim.height > rootSize.height.value) {
    const scale = rootSize.height.value / finalDim.height;
    finalDim.width *= scale;
    finalDim.height *= scale;
  }
  console.log(finalDim, rootSize.width.value)
  return finalDim;
})

//const actualWidth = computed(() => appState.sketch.aspectRatio < 1 ? Math.min(maxWidth.value / appState.sketch.aspectRatio, maxWidth.value) : maxWidth.value);
// actualHeight = computed(() => actualWidth.value * appState.sketch.aspectRatio);
const viewBox = computed(() => `0 0 1 ${appState.sketch.aspectRatio}`)

const svg = useTemplateRef('svg')
const newLine = reactive<number[]>([])
const mousePosition = reactive<{ x: number, y: number }>({ x: 0, y: 0 });
const timeLastMouseMove = ref(Date.now())
const isMouseDown = ref<boolean>(false);
const actualStrength = computed(() => appState.mode === "view" ? EFFECT_STRENGTH : 0)

const pointerDown = (e: PointerEvent) => {
  isMouseDown.value = true;
  const pos = getPointerPosition(e)
  if (pos && appState.mode === "draw") {
    newLine.splice(0)
    newLine.push(pos.x, pos.y)
  }
};


const pointerMove = (e: PointerEvent) => {
  updateMousePosition(e)
  const pos = getPointerPosition(e)
  if (pos && newLine.length > 0) {
    newLine.push(pos.x, pos.y)
  }
};

const pointerUp = (e: PointerEvent) => {
  isMouseDown.value = false;
  const pos = getPointerPosition(e)

  if (pos && newLine.length > 0) {
    newLine.push(pos.x, pos.y)
    const item = newLine.slice();
    const optimized = optimizePoints(item);
    appState.addLine(optimized)
    newLine.splice(0);
  }
};

const getPointerPosition = (e: PointerEvent) => {

  var pos = getPointerPositionRelative(e, svg);
  if (pos) {
    pos.y *= appState.sketch.aspectRatio;
  }
  return pos;
}

const updateMousePosition = (e: MouseEvent) => {
  var pos = getPointerPositionRelative(e, svg);
  if (!pos) {
    return;
  }
  mousePosition.x = clamp01(pos.x) * 2 - 1;
  mousePosition.y = clamp01(pos.y) * 2 - 1;
  timeLastMouseMove.value = Date.now();

}

const eraseLine = (line: number, layer: string, cancel: boolean = false) => {
  if (appState.mode === "erase" && appState.editedFrame === layer && !cancel) {
    appState.eraseLine(line, layer)
  }
}

useEventListener("pointermove", pointerMove)
useEventListener("pointerup", pointerUp)
//useEventListener("mousemove", updateMousePosition)

const deviceOrientation = useDeviceMotion()
watch([deviceOrientation.rotationRate, deviceOrientation.isSupported, timeLastMouseMove], ([rotationRate, isSupported, timeLastMouseMove]) => {
  var now = Date.now();
  if (isSupported && rotationRate && timeLastMouseMove + MOUSE_MOVE_COOLDOWN < now) {
    if (rotationRate.beta) {
      mousePosition.x = clamp(mousePosition.x - rotationRate.beta * 0.001, -1, 1);
    }

    if (rotationRate.alpha) {
      mousePosition.y = clamp(mousePosition.y - rotationRate.alpha * 0.001, -1, 1);
    }
  }

})


</script>

<template>
  <div class="root" ref="root">
    <svg ref="svg" class="canvas" :viewBox="viewBox" :width="actualDimension.width" :height="actualDimension.height"
      @pointerdown="pointerDown" :style="{ aspectRatio: appState.sketch.aspectRatio }">
      <g v-for="layer in appState.sketch.frames" :style="{
        transformOrigin: ` 50% 50%`, transform: ` scale(${(1 +
          Math.abs(layer.position * actualStrength * 2))})translate(${actualStrength * mousePosition.x * layer.position}px,
      ${actualStrength * mousePosition.y * layer.position}px)`
      }">
        <path v-for="(line, lineIndex) in layer.lines" @click="eraseLine(lineIndex, layer.id)"
          @pointerenter="eraseLine(lineIndex, layer.id, !isMouseDown)" :d="pathToSVG(line.points)" fill="none"
          :stroke="line.color" :stroke-width="line.weight" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <path :d="pathToSVG(newLine)" fill="none" :stroke="appState.color" :stroke-width="appState.lineWeight"
        stroke-linecap="round" stroke-linejoin="round"></path>

    </svg>
  </div>


</template>

<style scoped>
.canvas {
  border: 2px solid var(--gray-900);
  background:
    repeating-conic-gradient(#80808088 0 25%, #0000 0 50%) 50% / 32px 32px;
}

.root {
  flex: 1 1 600px;
  overflow: auto;
  display: flex;
  justify-self: stretch;
  justify-content: center;
  align-items: center;
}

@media (max-width: 400px) {
  .root {
    flex-basis: 1px;
  }
}
</style>
