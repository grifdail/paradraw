import { defineStore } from 'pinia'

export const useAppState = defineStore('appState', {
    // arrow function recommended for full type inference
    state: (): AppState => {
        var s: AppState = {
            sketch: {
                aspectRatio: 2,
                frames: [{
                    position: 0,
                    locked: false,
                    lines: []
                }]
            },
            locked: false,
            editedFrame: 0,
            tool: 'draw',
            lineWeight: 0.01,
            color: '#ff0000'
        }
        return s;
    },
    actions: {
        addLine(points: number[]) {

            this.sketch.frames[this.editedFrame]?.lines.push({
                color: this.color,
                weight: this.lineWeight,
                points: points
            })
        },
        eraseLine(lineIndex: number, layerIndex: number) {
            this.sketch.frames[layerIndex]?.lines.splice(lineIndex, 1);
        }
    }
})

export type AppState = {
    sketch: SketchData,
    locked: boolean,
    editedFrame: number,
    tool: "draw" | "erase"
    lineWeight: number,
    color: string,
}

export type SketchData = {
    aspectRatio: number,
    frames: FrameData[];
}

export type FrameData = {
    position: number,
    locked: false,
    lines: LineData[]
}

export type LineData = {
    color: string,
    weight: number,
    points: number[]
}