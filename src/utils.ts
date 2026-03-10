import * as simplify from "simplify-path";

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
        if (!previous) {
            return [path, current];
        } else {
            return [path === undefined ? `M ${previous} ${current}` : `${path} L ${previous} ${current}`, undefined]
        }
    }, [undefined, undefined])[0] as string
}