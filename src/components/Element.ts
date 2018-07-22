import { AbstractHtmlElement } from "../lib/AbstractHtmlElement";
import { IPlumbable } from "./Interfaces";
import { jsPlumbInstance } from "jsplumb";

import "../lib/string.extensions"

export class WtfElement extends AbstractHtmlElement implements IPlumbable {
    public top = "";
    public left = "";
    public shape = "rectangle";

    getHtml() {
        const initialHtml = this.innerHTML;
        const shape = this.getShape();

        return /*html*/`
            <style>
                .wtf-element-shape {
                    fill: lightgray;
                    stroke: black;
                    stroke-width: 2px;
                }
                .wtf-foreign-object-wrapper {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                }
            </style>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                ${shape}
                <foreignObject x="0" y="0" width="100%" height="100%">
                    <div xmlns="http://www.w3.org/1999/xhtml" class="wtf-foreign-object-wrapper">
                        ${initialHtml}
                    </div>
                </foreignObject>
            </svg>
        `;
    }

    getShape() {
        switch(this.shape) {
            case "ellipse":
                return /*html*/`<ellipse cx="50%" cy="50%" rx="48%" ry="48%" class="wtf-element-shape" />`;
            case "diamond":
                return /*html*/`
                <g>
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 50 L50 0 L100 50 L50 100 Z" class="wtf-element-shape" />
                    </svg>
                </g>`;
            case "rectangle":
            default:
                return /*html*/`<rect x="2%" y="2%" rx="5" ry="5" width="96%" height="96%" class="wtf-element-shape" />`;
        }
    }

    apply(instance: jsPlumbInstance) {
        if (this.draggable) {
            instance.draggable(this, <any>{ grid: [20, 20] });
        }

        this.style.top = `${this.top}px`;
        this.style.left = `${this.left}px`;
    }
}

window.customElements.define('wtf-element', WtfElement);