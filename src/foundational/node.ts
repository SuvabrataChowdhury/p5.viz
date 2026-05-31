import p5 from 'p5';

interface CircleParams {
    x: number,
    y: number,
    diameter: number
}

export class Node {
    private p: p5;

    private _text: string | number;
    private _circleParams: CircleParams;
    private _highlighted: boolean;
    private _hidden: boolean;

    constructor(p: p5, text: string | number, circleParams: CircleParams, highlighted = false, hidden = true) {
        this.p = p;

        this._text = text;
        this._circleParams = circleParams;

        this._highlighted = highlighted;
        this._hidden = hidden;

        if (!this._hidden) {
            this.draw();
        }
    }

    get text() {
        return this._text;
    }

    set text(text) {
        this._text = text;

        if (!this.hidden) {
            this.draw();
        }
    }

    // get x(): number {
    //     return this._circleParams.x;
    // }

    // get y(): number {
    //     return this._circleParams.y;
    // }

    get circleParams(): CircleParams {
        return this._circleParams;
    }

    set circleParams(circleParams: CircleParams) {
        this._circleParams = circleParams;

        if (!this.hidden) {
            this.draw();
        }
    }

    get highlighted() {
        return this._highlighted;
    }

    set highlighted (highlighted) {
        this._highlighted = highlighted;

        if (!this.hidden) {
            this.draw();
        }
    }

    get hidden(): boolean {
        return this._hidden;
    }

    set hidden(hidden: boolean) {
        this._hidden = hidden;

        if(!this.hidden) {
            this.draw();
        }
    }

    private draw = () => {
        this._hidden = false;

        this._drawCircle();
        this._drawText();
    }

    _drawCircle = () => {
        this.p.push();

        if (this.highlighted) {
            this.p.stroke(50, 200, 0);
            this.p.strokeWeight(10);
        }

        this.p.circle(this.circleParams.x, this.circleParams.y, this.circleParams.diameter);

        this.p.pop();
    }

    _drawText = () => {
        this.p.push();

        if (this.highlighted) {
            // this.p.strokeWeight(3);
            this.p.strokeWeight(5);
            this.p.fill(0, 250, 20);
        }

        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.textSize(this.circleParams.diameter / 2);
        this.p.text(this.text, this.circleParams.x, this.circleParams.y);

        this.p.pop();
    }
}