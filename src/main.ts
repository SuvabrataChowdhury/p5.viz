import p5 from 'p5';

import './style.css';

let animations = [];

function frame() {
  for (const animation of animations) {
    animation();
  }
};

function queueFrame(frame) {
  animations.push(frame);
}


// Define the sketch using a p5 instance parameter
const sketch = (p: p5) => {
  // let x = 0;
  // let y = 0;

  function dynamicCircle(frameCount, x, y, d) {
    const callBack = () => {

      const currentFrame = p.frameCount - frameCount;

      p.circle(x, y, Math.min(d, currentFrame));
    }

    return callBack;
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    queueFrame(() => {
      p.circle(p.mouseX, p.mouseY, 10);
    })
  };

  p.draw = () => {
    p.background(220);
    p.fill(255, 0, 0);
    p.noStroke();

    frame();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  p.mouseClicked = () => {
    queueFrame(dynamicCircle(p.frameCount, p.mouseX, p.mouseY, p.random(50, 250)));
  }
};

// Instantiate the sketch and attach it to a DOM element
new p5(sketch, document.getElementById('app') || undefined);
