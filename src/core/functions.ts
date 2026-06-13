import p5 from 'p5';

import type { P5Callback } from "./type";

const callbacks: P5Callback[] = [];

function queueCallback(callback: P5Callback): void {
    callbacks.push(callback);
}

function frame(p: p5): void {
    for (const callback of callbacks) {
        callback(p);
    }
}

export {queueCallback, frame};