# p5.viz

A p5.js library for visualization stuff written in TypeScript.

## Some Defining terms

Any p5.js sketch has following anatomy,

1. **setup:** It gets called at the very begining of the sketch once.
2. **draw:** It gets called repeatedly (60 times a second).
3. **event handlers:** These get called on different events that happens on the canvas. E.g., mouseClicked(), keyPressed() etc.

Every animation is made out of a sequence of images(referred to as frame). draw() places each frame. As draw is the ultimate artist for animation we make sure draw always gets to place the frames.

Mathematically an animation can be though of as a function of framecount. Formally,

$$
a: F \rightarrow D
$$

where,

- $a$ defines the animation
- $F = \mathbb{Z}^+$
- $D = \left\{ d \; | d \; \in \mathcal{P}(P) \right\}$
- $P = \text{Set of all pixels on screen}$

So, calling $a$ with a frame number makes it draw out the figure for that perticular frame. So if we call $a$ with all possible valid frame count and play them in order it will carry out the animation.


## Example calls


## Framework Call

```js

setup() {
    queueFrame(dynamicCircle(...));
}

draw() {
    frame(frameCount);
}
```

## Dynamic Variants

```ts
dynamicCircle(circleParams: P5CircleParams, animationParams: DynamicAnimationParams): DynamicP5Object
```

## Design

**Framework Usage**
```mermaid
flowchart TD

    frames[(Callbacks for Frames)]

    subgraph fns_called_once
        fn_start --> queueFrames
        queueFrames --> fn_end
        queueFrames <--> frames
    end


    subgraph draw
        setup_end --> draw_start
        draw_start --> frame
        frame --> draw_end
        frame <--> frames
        draw_end --> draw_start
    end
```

It is evident that draw should not hold static things

**Code level design**

```mermaid
---
config:
  layout: elk
---
flowchart TB
    subgraph p5["p5"]
        direction LR
        p5NativeFn["p5 Native Functions"]
        draw["draw()"]
        frameCount["frameCount"]
    end
    subgraph library["p5.viz Library"]
        subgraph core["core"]
            shapeParams["Shape Parameters"]
            animationParams["Animation Parameters"]
            dynamicShape["dynamicShape()"]
            p5Callback["p5Callback()"]
            callbacks(["In Memory store"])
            queueCallback["queueCallback()"]
            frame["frame()"]
            transform["transform()"]
        end

        shape["Shape"]
    end
    shapeParams -- goes into --> dynamicShape & transform
    animationParams -- goes into --> dynamicShape & transform
    transform -- returns --> shapeParams
    dynamicShape -- returns --> p5Callback
    frameCount -- goes into --> p5Callback & frame
    p5Callback -- draws --> shape
    p5Callback -- goes into --> queueCallback
    p5Callback -- calls --> transform
    queueCallback -- stores into --> callbacks
    draw -- calls --> frame
    frame -- calls all --> callbacks
    p5NativeFn -- calls --> dynamicShape
    p5NativeFn -- calls --> queueCallback

```

## Implementation plans
**core:**
```ts
type AnimationParams = {
    firstFrameCount: number,
    
    // ...
};
type P5Callback = (p: p5, currentFrameCount: number) => void;
type DynamicShape = (shapeParams: object, animationParams: AnimationParams) => P5Callback;

// ...

let callbacks: P5Callback[] = [];
function queueCallback(callback: P5Callback): void {
    callbacks.push(callback);
}

function frame(p: p5, currentFrameCount: number): void {
    for (callback of callbacks) {
        callback(p, currentFrameCount);
    }
}
```
