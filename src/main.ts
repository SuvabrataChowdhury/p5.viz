import p5 from 'p5';

import './style.css';
import { Node } from './';

// Define the sketch using a p5 instance parameter
const sketch = (p: p5) => {
  let toggle = false;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(220);
  };

  p.draw = () => {
    p.background(0);
    // p.fill(255, 0, 0);

    // p.circle(p.windowWidth/2, p.windowHeight/2, 50);

    const node: Node = new Node(p, 4, {x: p.windowWidth/2, y: p.windowHeight/2, diameter: 50}, false, true);
    node.hidden = toggle;

    // node.circleParams = {
    //   x: p.mouseX,
    //   y: node.circleParams.y,
    //   diameter: node.circleParams.diameter
    // };
  };

  p.mouseClicked = () => {
    toggle = !toggle;
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
};

// Instantiate the sketch and attach it to a DOM element
new p5(sketch, document.getElementById('app') || undefined);
