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

    connectedCallback() {
        this.populateProperties();
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