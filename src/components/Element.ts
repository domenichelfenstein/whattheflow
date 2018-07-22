import { AbstractHtmlElement } from "../lib/AbstractHtmlElement";
import { IPlumbable } from "./Interfaces";
import { jsPlumbInstance } from "jsplumb";

import "../lib/string.extensions"
import { Direction, toEndpointName } from "./Common";

export class WtfElement extends AbstractHtmlElement implements IPlumbable {
    private initialHtml: string;

    public top = "";
    public left = "";

    constructor() {
        super();

        console.log("ctor: Element");
    }

    getHtml() {
        return /*html*/`
            <style>
            .wtf-block {
                flex: 1 1 auto;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
            }
            </style>
            <div class="wtf-block">
                ${this.initialHtml}
            </div>`;
    }

    connectedCallback() {
        this.initialHtml = this.innerHTML;

        super.connectedCallback();
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