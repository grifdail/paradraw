import { saveAs } from "file-saver";
import type { SketchData } from "./AppState";
import JSZip from "jszip";
import { pathToSVG } from "./utils";

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
            for (let index = 0; index < line.points.length; index += 2) {
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

export async function exportAsSVGZip(sketch: SketchData, fileName: string) {

    const SCREEN_DIMENSION = 600;
    const relativeHeight = sketch.aspectRatio;
    const actualWidth = sketch.aspectRatio < 1 ? SCREEN_DIMENSION / sketch.aspectRatio : SCREEN_DIMENSION;
    const actualHeight = actualWidth * relativeHeight;
    var zip = new JSZip()
    sketch.frames.map((frame, index) => {

        const canvas = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        canvas.setAttribute("width", actualWidth.toString());
        canvas.setAttribute("height", actualHeight.toString());
        canvas.setAttribute("viewBox", `0 0 1 ${relativeHeight}`)


        frame.lines.forEach(line => {

            var path = document.createElementNS("http://www.w3.org/2000/svg", "path")
            if (line.points.length <= 2) {
                return
            }
            path.setAttribute("stroke", line.color)
            path.setAttribute("stroke-linecap", "round");
            path.setAttribute("stroke-linejoin", "round");
            path.setAttribute("stroke-width", line.weight.toString())
            path.setAttribute("d", pathToSVG(line.points))
            canvas.appendChild(path);
        })
        var str = canvas.outerHTML;
        console.log(str);

        zip.file(`frame_${index}_${Math.round(frame.position * 100)}.svg`, str);


    })


    const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
    saveAs(zipBlob, fileName);

}