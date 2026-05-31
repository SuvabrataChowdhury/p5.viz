import p5 from 'p5';

import './style.css';

// Define the sketch using a p5 instance parameter
const sketch = (p: p5) => {
  let x = 0;
  let y = 0;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(220);
  };

  p.draw = () => {
    p.background(220);
    p.fill(255, 0, 0);

    p.circle(x, y, 50);

    // Simple animation
    x = (x + 1) % p.windowWidth;
    y = (y + 1) % p.windowHeight;
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
};

// Instantiate the sketch and attach it to a DOM element
new p5(sketch, document.getElementById('app') || undefined);
