<script setup lang="ts">
import { useId, useTemplateRef } from 'vue';

defineSlots<{ default(): any, "button-content"(): any }>()
const props = defineProps<{
    "popover-class"?: string
}>()

const popover = useTemplateRef('popover');
const toggle = () => {
    if (popover.value) {
        popover.value.togglePopover()
    }
}

defineExpose({
    toggle
})

const id = `--${useId()}`
console.log(props['popover-class'])

</script>

<template>
    <button @click="toggle" :style="{ anchorName: id }">
        <slot name="button-content"></slot>
    </button>
    <div class="popover" v-bind="$attrs" :class="$props['popover-class']" popover ref="popover"
        :style="{ positionAnchor: id }">
        <slot></slot>
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
    border-radius: var(--border-radius-3);
}
</style>
