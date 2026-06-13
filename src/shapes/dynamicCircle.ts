import p5 from 'p5';
import type { AnimationParams, DynamicShape, P5Callback, ShapeAnimation, ShapeParams } from "../core";

interface CircleParams extends ShapeParams {
    x: number,
    y: number,
    d: number
};

const growCircle: ShapeAnimation<CircleParams> = (shapeParams: CircleParams, currentFrame: number): CircleParams => {

    // const currentRelativeFrame = p.frameCount - animationParams.firstFrameCount;

    const { x, y, d } = shapeParams;

    return {
        x,
        y,
        d: Math.min(d, currentFrame) 
    };
}

const dynamicCircle: DynamicShape<CircleParams> = (shapeParams: CircleParams, animationParams: AnimationParams<CircleParams>): P5Callback => {
    return (p: p5) => {
        const currentRelativeFrame = p.frameCount - animationParams.firstFrameCount;

        const { x, y, d } = animationParams.shapeAnimation(shapeParams, currentRelativeFrame);

        p.circle(x, y, d);
    }
}

export { dynamicCircle, growCircle, type CircleParams };