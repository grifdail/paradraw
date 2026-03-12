import { nanoid } from 'nanoid';
import { defineStore } from 'pinia'

export const useAppState = defineStore('appState', {
    // arrow function recommended for full type inference
    state: (): AppState => {
        var baseId = nanoid()
        var s: AppState = {
            sketch: {
                aspectRatio: 1,
                frames: [{
                    id: baseId,
                    position: 0,
                    locked: false,
                    visible: true,
                    lines: []
                }]
            },
            editedFrame: baseId,
            mode: 'draw',
            lineWeight: 0.01,
            color: '#ff0000'
        }
        return s;
    },
    actions: {
        addLine(points: number[]) {

            var index = this.sketch.frames.findIndex(item => item.id === this.editedFrame)
            if (index < 0) {
                return;
            }
            this.sketch.frames[index]?.lines.push({
                color: this.color,
                weight: this.lineWeight,
                points: points
            })
        },
        eraseLine(lineIndex: number, frame: string) {
            var frameIndex = this.sketch.frames.findIndex(item => item.id === frame)
            if (frameIndex < 0) {
                return;
            }
            this.sketch.frames[frameIndex]?.lines.splice(lineIndex, 1);
        },
        moveFrame(frameId: string, position: number) {
            console.log(frameId, position)
            var frameIndex = this.sketch.frames.findIndex(item => item.id === frameId)
            if (frameIndex < 0) {
                return;
            }
            var frame = this.sketch.frames[frameIndex]
            if (frame) {
                frame.position = position
                this.sortFrames();
            }

        },
        sortFrames() {
            this.sketch.frames.sort((a: FrameData, b: FrameData) => b.position - a.position);

        },
        addFrame() {
            const newFrame: FrameData = {
                id: nanoid(),
                position: Math.random() * 2 - 1,
                locked: false,
                visible: true,
                lines: []
            };
            this.sketch.frames.push(newFrame);
            this.sortFrames();
            this.editedFrame = newFrame.id;
        },
        newSketch(aspectRatio: number) {
            const frame = {
                id: nanoid(),
                position: 0,
                locked: false,
                visible: true,
                lines: []
            };
            this.sketch = {
                aspectRatio,
                frames: [frame]
            };
            this.editedFrame = frame.id
        }
    },
    persist: true
})

export type AppState = {
    sketch: SketchData,
    editedFrame: string,
    mode: "view" | "draw" | "erase"
    lineWeight: number,
    color: string,
}

export type SketchData = {
    aspectRatio: number,
    frames: FrameData[];
}

export type FrameData = {
    id: string,
    position: number,
    locked: boolean,
    visible: boolean,
    lines: LineData[]
}

export type LineData = {
    color: string,
    weight: number,
    points: number[]
}