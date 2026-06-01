import p5 from 'p5';

interface ShapeProps {
    p: p5,
    isHighlighted?: boolean,
    isHidden?: boolean,
};

abstract class Shape {
    readonly p: p5;
    private _isHighlighted: boolean;
    private _isHidden: boolean;

    constructor({p, isHighlighted = false, isHidden = false}: ShapeProps) {
        this.p = p;
        this._isHighlighted = isHighlighted;
        this._isHidden = isHidden;
    }

    get isHighlighted(): boolean {
        return this._isHighlighted;
    }

    set isHighlighted(isHighlighted: boolean) {
        this._isHighlighted = isHighlighted;

        this.conditionalDraw();
    }

    get isHidden(): boolean {
        return this._isHidden;
    }

    set isHidden(isHidden: boolean) {
        this._isHidden = isHidden;

        this.conditionalDraw();
    }

    public conditionalDraw = () => {
        if (!this._isHidden) {
            this.draw();
        }
    }

    abstract draw(): void;
}


interface CircleProps extends ShapeProps {
    ellipseMode?: "center" | "radius" | "corner" | "corners",
    x: number,
    y: number,
    d: number
};

export class Circle extends Shape {
    private _ellipseMode: CircleProps["ellipseMode"] = "center";
    private _x: number;
    private _y: number;
    private _d: number;

    constructor({ ellipseMode, x, y, d, ...shapeProps}: CircleProps) {
        super(shapeProps);

        this._ellipseMode = ellipseMode || this.p.CENTER;
        this._x = x;
        this._y = y;
        this._d = d;

        this.conditionalDraw();
    }

    get ellipseMode(): CircleProps["ellipseMode"] {
        return this._ellipseMode;
    }

    set ellipseMode(ellipseMode: CircleProps["ellipseMode"]) {
        if(!ellipseMode) {
            console.error("Invalid ellipse mode passed");
            return;
        }

        const allowedEllipseModes: string[] = [this.p.CENTER, this.p.RADIUS, this.p.CORNER, this.p.CORNERS]

        if (!allowedEllipseModes.includes(ellipseMode)) {
            console.error("Allowed ellipse modes are: ", allowedEllipseModes);
        }

        this._ellipseMode = ellipseMode;
    }

    get x(): number {
        return this._x;
    }

    set x(x: number){
        this._x = x;

        this.conditionalDraw();
    }

    get y(): number {
        return this._y;
    }

    set y(y: number){
        this._y = y;

        this.conditionalDraw();
    }

    draw = (): void => {
        this.p.push();

        if(this._ellipseMode) {
            this.p.ellipseMode(this._ellipseMode);
        }
        
        this.p.circle(this._x, this._y, this._d);
        this.p.pop();
    }
}
