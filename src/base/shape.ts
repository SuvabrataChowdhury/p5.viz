import p5 from 'p5';

export interface ShapeProps {
    p: p5,
    isHighlighted?: boolean,
    isHidden?: boolean,
};

export abstract class Shape {
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

    // TODO: Does not cover all the cases
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

