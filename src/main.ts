import p5 from 'p5';

import './style.css';

let animations = [];

function frame() {
  for(const animation of animations) {
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

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    // p.background(220);
    
    // x = p.windowWidth/2;
    // y = p.windowHeight/2;

    // let frameOffset = 0;
    // queueFrame(() => {

    //   const currentFrame = p.frameCount - frameOffset;

    //   if(p.mouseIsPressed) {
    //     frameOffset = p.frameCount;
    //   }

    //   p.circle(p.mouseX, p.mouseY, Math.min(200, currentFrame));
    // });
  };

  p.draw = () => {
    p.background(220);
    p.fill(255, 0, 0);
    
    frame();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  p.mouseClicked = () => {
    const clickedFrame = p.frameCount;
    const mouseX = p.mouseX;
    const mouseY = p.mouseY;

    const maxRadius = p.random(50, 250);

    queueFrame(() => {
      const currentFrame = p.frameCount - clickedFrame;
     
      p.circle(mouseX, mouseY, Math.min(maxRadius, currentFrame)); 
    });
  }
};

// Instantiate the sketch and attach it to a DOM element
new p5(sketch, document.getElementById('app') || undefined);
