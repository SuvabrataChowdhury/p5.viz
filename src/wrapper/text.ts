import { Shape, type ShapeProps } from "../base";

interface TextAlign {
    hAlign: "left" | "center" | "right",
    vAlign: "top" | "center" | "bottom" | "alphabetic"
}

export interface TextProps extends ShapeProps {
    text: string,
    x: number,
    y: number,
    alignment?: TextAlign;
    textSize?: number;
}

export class Text extends Shape {
    private _text: string;

    private _x: number;
    private _y: number;

    private _alignment?: TextAlign;
    private _textSize?: number;

    constructor({text, x, y, alignment, textSize, ...shapeProps}: TextProps) {
        super(shapeProps);

        this._text = text;
        this._x = x;
        this._y = y;

        this._alignment = alignment;
        this._textSize = textSize;

        this.conditionalDraw();
    }

    get text() {
        return this._text;
    }

    set text(text: string) {
        this._text = text;

        this.conditionalDraw();
    }

    get x() {
        return this._x;
    }

    set x(x: number) {
        this._x = x;

        this.conditionalDraw();
    }

    get alignment() {
        return this._alignment || {hAlign: 'left', vAlign: 'bottom'};
    }

    set alignment(alignment: TextAlign) {
        this._alignment = alignment;

        this.conditionalDraw();
    }

    get textSize() {
        return this._textSize || 0;
    }

    set textSize(textSize: number) {
        this._textSize = textSize;

        this.conditionalDraw();
    }

    get y() {
        return this._y;
    }

    set y(y: number) {
        this._y = y;

        this.conditionalDraw();
    }
    public draw = () => {
        this.p.push();

        if (this.textSize == 0 || this.textSize) {
            this.p.textSize(this.textSize);
        }

        if (this.alignment) {
            this.p.textAlign(this.alignment.hAlign, this.alignment.vAlign);
        }

        this.p.text(this.text, this.x, this.y);

        this.p.pop();
    }
}