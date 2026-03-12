<script setup lang="ts">
import { IconDownload, IconFile } from '@tabler/icons-vue';
import { useAppState } from '../AppState';
import DropdownMenu from './DropdownMenu.vue';
import AboutPopup from './AboutPopup.vue'
import { saveAs } from 'file-saver';
import { nanoid } from 'nanoid';
import { exportAsPngZip, exportAsSVGZip } from '../exports';

const RATIO_SQUARE = 1;
const RATIO_LANDSCAPE = 1 / 1.618033988749894;
const RATIO_PORTRAIT = 1.618033988749894;

//defineProps<{ msg: string }>()
const appState = useAppState();



const downloadJson = () => {
    const json = JSON.stringify(appState.sketch);
    const blob = new Blob([json], { type: "text/application/json;charset=utf-8" });
    saveAs(blob, `paradraw_${nanoid()}.json`)
}

const downloadPNGs = () => {
    exportAsPngZip(appState.sketch, `paradraw_png_${nanoid()}.zip`)
}
const downloadSVGs = () => {
    exportAsSVGZip(appState.sketch, `paradraw_svg_${nanoid()}.zip`)
}

const uploadJson = () => {
    var input = document.createElement('input');
    input.type = 'file';

    input.addEventListener("change", () => {

        // getting a hold of the file reference
        var file = input.files?.[0];

        if (file) {
            // setting up the reader
            var reader = new FileReader();
            reader.readAsText(file, 'UTF-8');

            // here we tell the reader what to do when it's done reading...
            reader.onload = (readerEvent) => {
                var content = readerEvent.target?.result as string; // this is the content!

                var json = JSON.parse(content);
                appState.loadSketch(json);
                console.log(json);

            };
        }

    });

    input.click();

}



</script>

<template>
    <div class="root">
        <DropdownMenu>
            <template #button-content>
                <IconFile></IconFile>
            </template>
            <template #default>
                <button @click="appState.newSketch(RATIO_SQUARE)">Square</button>
                <button @click="appState.newSketch(RATIO_PORTRAIT)">Portrait</button>
                <button @click="appState.newSketch(RATIO_LANDSCAPE)">Landscape</button>
            </template>
        </DropdownMenu>
        <span>
            <h1>Paradraw</h1>
            <AboutPopup />
        </span>
        <DropdownMenu>
            <template #button-content>
                <IconDownload v-tooltip title="Export (Not yet available)" />
            </template>
            <template #default>
                <button @click="downloadJson">Download as JSON</button>
                <button @click="uploadJson">Load from JSON</button>
                <button @click="downloadPNGs">Export as PNG zip</button>
                <button @click="downloadSVGs">Export as SVG zip</button>
                <button disabled>Export GIF</button>
                <button disabled>Export HTML file</button>
            </template>
        </DropdownMenu>
    </div>
</template>


<style scoped>
.root {
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    align-self: stretch;

    &>button {
        aspect-ratio: 1;

    }

    &>span {
        text-align: center;
        display: flex;
        align-items: baseline;
        justify-content: center;
        gap: var(--size-03);

        &:deep(button) {
            background: transparent;
            border: none;
        }
    }
}
</style>
