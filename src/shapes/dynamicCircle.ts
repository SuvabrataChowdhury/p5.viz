import p5 from 'p5';
import type { AnimationParams, DynamicShape, P5Callback, ShapeAnimationDraw, ShapeParams } from "../core";

interface CircleParams extends ShapeParams {
    x: number,
    y: number,
    d: number
};

const growAnimation: ShapeAnimationDraw<CircleParams> = (p: p5, shapeParams: CircleParams, currentFrame: number) => {
    const { x, y, d } = shapeParams;
    p.circle(x, y, Math.min(d, currentFrame));
}

const drawAnimation: ShapeAnimationDraw<CircleParams> = (p: p5, shapeParams: CircleParams, currentFrame: number) => {
    const { x, y, d } = shapeParams;

    p.arc(x, y, d, d, 0, Math.min( 2 * Math.PI, currentFrame * Math.PI/180));
}

const defaultCircleAnimation: AnimationParams<CircleParams> = {
    firstFrameCount: 0,
    drawShape: (shapeParams) => shapeParams
}

const dynamicCircle: DynamicShape<CircleParams> = (shapeParams: CircleParams, animationParams: AnimationParams<CircleParams> = defaultCircleAnimation): P5Callback => {
    return (p: p5) => {
        const currentRelativeFrame = p.frameCount - animationParams.firstFrameCount;
        animationParams.drawShape(p, shapeParams, currentRelativeFrame);
    }
}

export { dynamicCircle, growAnimation, drawAnimation,  type CircleParams };