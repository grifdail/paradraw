import { saveAs } from "file-saver";
import type { SketchData } from "./AppState";
import JSZip from "jszip";

export async function exportAsPngZip(sketch: SketchData, fileName: string) {

    const SCREEN_DIMENSION = 600;
    const relativeHeight = sketch.aspectRatio;
    const actualWidth = sketch.aspectRatio < 1 ? SCREEN_DIMENSION / sketch.aspectRatio : SCREEN_DIMENSION;
    const actualHeight = actualWidth * relativeHeight;
    var zip = new JSZip()
    await Promise.all(sketch.frames.map((frame, index) => {

        const canvas = document.createElement("canvas");
        canvas.width = actualWidth;
        canvas.height = actualHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return {
                dataUrl: "",
                filename: ""
            };
        }
        ctx.lineCap = "round";
        ctx.lineJoin = "round"
        ctx.clearRect(0, 0, actualWidth, actualHeight);
        frame.lines.forEach(line => {
            if (line.points.length <= 2) {
                return
            }
            ctx.strokeStyle = line.color;
            ctx.lineWidth = line.weight * actualWidth;
            ctx.beginPath()
            ctx.moveTo((line.points[0] as number) * actualWidth, (line.points[1] as number) * actualHeight);
            for (let index = 2; index < line.points.length; index += 2) {
                ctx.lineTo((line.points[index + 0] as number) * actualWidth, (line.points[index + 1] as number) * actualHeight)
            }
            ctx.stroke();
        })

        var p = new Promise<void>((r) => {
            canvas.toBlob((blob) => {
                zip.file(`frame_${index}_${Math.round(frame.position * 100)}.png`, blob as Blob, { base64: true });
                r();
            }, "image/png");
        })
        return p


    }))


    const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
    saveAs(zipBlob, fileName);

}