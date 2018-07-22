import { AbstractHtmlElement } from "../lib/AbstractHtmlElement";
import { IPlumbable } from "./Interfaces";
import { jsPlumbInstance } from "jsplumb";

import "../lib/string.extensions"

export class WtfElement extends AbstractHtmlElement implements IPlumbable {
    public top = "";
    public left = "";

    connectedCallback() {
        this.populateProperties();

        const initialHtml = this.innerHTML;

        this.innerHTML = /*html*/`
        <style>
            rect {
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
            <rect x="0" y="0" width="100%" height="100%" />
            <foreignObject x="0" y="0" width="100%" height="100%">
                <div xmlns="http://www.w3.org/1999/xhtml" class="wtf-foreign-object-wrapper">
                    ${initialHtml}
                </div>
            </foreignObject>
        </svg>
        `;
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