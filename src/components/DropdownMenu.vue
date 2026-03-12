<script setup lang="ts">
import { useTemplateRef } from 'vue';
import PopoverPanel from './PopoverPanel.vue';

defineSlots<{ default(): any, "button-content"(): any }>()

const popover = useTemplateRef("popover")

const toggle = () => {
    if (popover.value) {
        popover.value.toggle();
    }
}

</script>

<template>
    <PopoverPanel class="menu" ref="popover">
        <template #button-content>
            <slot name="button-content"></slot>
        </template>
        <template #default>
            <div class="menu-content" @click="toggle">
                <slot name="default"></slot>
            </div>

        </template>
    </PopoverPanel>

</template>


<style lang="css">
.menu-content {
    display: flex;
    gap: var(--size-03);
    align-items: stretch;
    flex-direction: column;

    &>button {
        background: transparent;
        border: none;

        &:hover {
            background: rgba(0, 0, 0, 0.5);
        }
    }

}

.menu.popover {
    background: var(--gray-700);
    position-area: bottom span-right;
}
</style>