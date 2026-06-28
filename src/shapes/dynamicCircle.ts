import p5 from 'p5';
import type { AnimationParams, DynamicShape, P5Callback, ShapeParams } from "../core";

interface CircleParams extends ShapeParams {
    x: number,
    y: number,
    d: number
};

const growAnimation: AnimationParams<CircleParams>['animate'] = (p: p5, shapeParams: CircleParams, currentFrame: number) => {
    const { x, y, d } = shapeParams;
    p.circle(x, y, Math.min(d, currentFrame));
}

const drawAnimation: AnimationParams<CircleParams>['animate'] = (p: p5, shapeParams: CircleParams, currentFrame: number) => {
    const { x, y, d } = shapeParams;
    p.arc(x, y, d, d, 0, Math.min(2 * Math.PI, currentFrame * Math.PI / 180));
}

const defaultCircleAnimation: AnimationParams<CircleParams> = {
    animate: (p: p5, shapeParams: CircleParams) => {
        const { x, y, d } = shapeParams;
        p.circle(x, y, d);
    }
}

const dynamicCircle: DynamicShape<CircleParams> = (shapeParams: CircleParams, animationParams: AnimationParams<CircleParams> = defaultCircleAnimation): P5Callback => {
    let firstFrameCount: number | null = null;
    return (p: p5) => {
        if (firstFrameCount === null) firstFrameCount = p.frameCount;
        animationParams.animate(p, shapeParams, p.frameCount - firstFrameCount);
    }
}

export { dynamicCircle, growAnimation, drawAnimation,  type CircleParams };