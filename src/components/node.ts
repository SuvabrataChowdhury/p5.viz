import { Circle, Text} from '../wrapper';
import { Shape, type ShapeProps } from '../base';

interface NodeProps extends ShapeProps{
    x: number,
    y: number,
    d: number,

    text: string
};

export class Node extends Shape{

    private _x: number;
    private _y: number;
    private _d: number;

    private _label: string;

    private circle: Circle;
    private text: Text;

    constructor({x, y, d, text, ...shapeProps}: NodeProps) {
        super(shapeProps);

        this._x = x;
        this._y = y;
        this._d = d;

        this._label = text;

        this.circle = new Circle({x: this._x, y: this._y, d: this._d, ...shapeProps});
        this.text = new Text({text: this._label, x: this._x, y: this._y, textSize: this._d / 2, alignment: {hAlign: this.p.CENTER, vAlign: this.p.CENTER}, ...shapeProps});
    }

    get x() {
        return this._x;
    }

    set x(x: number) {
        this._x = x;

        // this.conditionalDraw();
        this.circle.x = x;
        this.text.x = x;
    }

    get y() {
        return this._y;
    }

    set y(y: number) {
        this._y = y;

        this.circle.y = y;
        this.text.y = y;
    }

    get d() {
        return this._d;
    }

    set d(d: number) {
        this._d = d;

        this.circle.d = d;
        this.text.textSize = d/2;
    }

    get label() {
        return this._label;
    }

    set label(label: string) {
        this.label = label;

        this.text.text = label
    }

    public draw = () => {
        this.circle.draw();
        this.text.draw();
    }
}