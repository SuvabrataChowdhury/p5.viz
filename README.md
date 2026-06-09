# p5.viz

A p5.js library for visualization stuff written in TypeScript.


## Example calls

```js

frames = [];

queueFrame(method) {
    frames.push(method);
}

frame() {
    for frame_desc of frames {
        frame_desc();
    }
}

setup() {
    node = node(pos, size, txt);

    queueFrame(highlight(node), style, [timing]);
}

draw() {
    frame(frameCount);
}

// 60 FPS by default
while(true) {
    draw();
}
```

## Design

```mermaid
flowchart TD

    frames[(Callbacks for Frames)]

    subgraph setup
        setup_start --> queueFrames
        queueFrames --> setup_end
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