import p5 from 'p5';

import './style.css';
import { dynamicCircle, growCircle } from './shapes';
import { frame, queueCallback } from './core';

// Define the sketch using a p5 instance parameter
const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    queueCallback((p) => {
      p.circle(p.mouseX, p.mouseY, 10);
    });
  };

  p.draw = () => {
    p.background(220);
    p.fill(255, 0, 0);

    frame(p);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.mousePressed = () => {
    const circleParams = {x: p.mouseX, y: p.mouseY, d: p.random(50, 250)};
    const circle = dynamicCircle( circleParams, {firstFrameCount: p.frameCount, shapeAnimation: growCircle});
    queueCallback(circle);
  };
};

// Instantiate the sketch and attach it to a DOM element
new p5(sketch, document.getElementById('app') || undefined);
