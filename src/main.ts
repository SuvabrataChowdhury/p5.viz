import p5 from 'p5';

import './style.css';
import { Node } from './';
import { Circle } from './wrapper/circle';
import { Text } from './wrapper/text';

// Define the sketch using a p5 instance parameter
const sketch = (p: p5) => {
  let toggle = false;
  let numClicks = 0;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(220);
  };

  p.draw = () => {
    p.background(255);
    // p.fill(255, 0, 0);

    // p.circle(p.windowWidth/2, p.windowHeight/2, 50);

    const node: Node = new Node({p, x: p.windowWidth/2, y: p.windowHeight/2, d: 50, text: "X"});
    node.isHidden = toggle;

    // node.circleParams = {
    //   x: p.mouseX,
    //   y: node.circleParams.y,
    //   diameter: node.circleParams.diameter
    // };

    new Circle({p: p, x: p.mouseX, y: p.mouseY, d: 50, isHidden: !toggle});

    new Text({p: p, text: "ABC", x: 100, y: 100, textSize: numClicks});
    // myCircle.draw();
  };

  p.mouseClicked = () => {
    toggle = !toggle;
    numClicks = 1 + numClicks;
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
};

// Instantiate the sketch and attach it to a DOM element
new p5(sketch, document.getElementById('app') || undefined);
