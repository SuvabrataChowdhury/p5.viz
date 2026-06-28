import p5 from 'p5';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ShapeParams {};

type AnimateFn<T extends ShapeParams> = (p: p5, shapeParams: T, currentFrame: number) => void;

interface AnimationParams<T extends ShapeParams> {
    animate: AnimateFn<T>;
};

type P5Callback = (p: p5) => void;
type DynamicShape<T extends ShapeParams> = (shapeParams: T, animationParams?: AnimationParams<T>) => P5Callback;

export type {ShapeParams, AnimationParams, P5Callback, DynamicShape, AnimateFn};
