import p5 from 'p5';
import type { AnimationParams, DynamicShape, P5Callback, ShapeParams } from "../core";

interface CircleParams extends ShapeParams {
    x: number,
    y: number,
    d: number
};

const dynamicCircle: DynamicShape<CircleParams> = (shapeParams: CircleParams, animationParams: AnimationParams): P5Callback => {
    return (p: p5) => {
        const currentRelativeFrame = p.frameCount - animationParams.firstFrameCount;

        const {x, y, d} = shapeParams;

        p.circle(x, y, Math.min(d, currentRelativeFrame));
    }
}

export {dynamicCircle, type CircleParams};