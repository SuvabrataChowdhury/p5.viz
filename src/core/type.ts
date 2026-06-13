import p5 from 'p5';

interface ShapeParams {};

type ShapeAnimation<T extends ShapeParams> = (shapeParams: T, currentFrame: number) => T;

interface AnimationParams<T extends ShapeParams> {
    firstFrameCount: number,
    shapeAnimation: ShapeAnimation<T>
};

type P5Callback = (p: p5) => void;
type DynamicShape<T extends ShapeParams> = (shapeParams: T, animationParams: AnimationParams<T>) => P5Callback;

export type {ShapeParams, AnimationParams, P5Callback, DynamicShape, ShapeAnimation};
