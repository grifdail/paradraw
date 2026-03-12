import * as simplify from "simplify-path";
import type { ShallowRef } from "vue";

export function optimizePoints(points: number[]): number[] {
    const pointArray = points.reduce(
        ([points, lastPoint], n) => {
            if (lastPoint === undefined) {
                return [points, n] as [[number, number][], number | undefined];
            } else {
                const a = [...points, [lastPoint, n] as [number, number]];
                return [a, undefined] as [[number, number][], number | undefined];
            }
        },
        [[], undefined] as [[number, number][], number | undefined]
    )[0];
    const newPoints = simplify.default(pointArray, 1 / 300) as [number, number][];
    return newPoints.flat();
}

export function pathToSVG(points: number[]): string {
    return points.reduce<[undefined | String, undefined | number]>(([path, previous], current) => {
        if (previous) {
            return [path === undefined ? `M ${previous} ${current}` : `${path} L ${previous} ${current}`, undefined]
        } else {
            return [path, current];
        }
    }, [undefined, undefined])[0] as string
}

export function getPointerPositionRelative(e: PointerEvent, elem: ShallowRef<Element | null>) {
    const rect = elem.value?.getBoundingClientRect();
    if (!rect) {
        return undefined;
    }
    return {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
    };
}

export function clamp(value: number, min: number, max: number) {
    const tmin = Math.min(min, max);
    const tmax = Math.max(min, max);
    return Math.max(tmin, Math.min(tmax, value));
}

export function clamp01(a: number) {
    return Math.min(1, Math.max(0, a))
}
