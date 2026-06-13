import p5 from 'p5';

interface ShapeParams {};

interface AnimationParams {
    firstFrameCount: number
};

type P5Callback = (p: p5) => void;
type DynamicShape<T extends ShapeParams> = (shapeParams: T, animationParams: AnimationParams) => P5Callback;

export type {ShapeParams, AnimationParams, P5Callback, DynamicShape};
