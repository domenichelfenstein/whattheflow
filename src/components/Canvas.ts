import { AbstractHtmlElement } from "../lib/AbstractHtmlElement";
import { jsPlumb } from "jsplumb";

import "./Element";
import "./Connection";
import "./Level";
import { IPlumbable } from "./Interfaces";

class WtfCanvas extends AbstractHtmlElement {
    private initialHtml: string;

    public width: string;
    public height: string;

    constructor() {
        super();

        console.log("ctor: Canvas");
    }

    connectedCallback() {
        this.populateProperties();

        this.style.width = `${this.width}px`;
        this.style.height = `${this.height}px`;
        this.style.display = "block";
        this.style.overflow = "hidden";
        this.style.position = "relative";


        const style = document.createElement("style");
        style.innerHTML = this.getCss();
        this.appendChild(style);

        const instance = jsPlumb.getInstance({
            DragOptions: { cursor: 'pointer', zIndex: 2000 },
            ConnectionOverlays: [
                ["Arrow", {
                    location: 1,
                    visible: true,
                    width: 11,
                    length: 11
                }]
            ],
            Container: this
        });

        for (let i = 0; i < this.children.length; i++) {
            const element = <IPlumbable><any>this.children[i];
            if (element.apply) {
                element.apply(instance);
            }
        }
    }
    getCss() {
        return `
            wtf-level {
                display: flex;
                justify-content: center;
                margin: 1em;
                height: 90px;
                position: relative;
            }
            wtf-element {
                display: flex;
                flex: 1 1 auto;
                justify-content: center;
                align-items: center;
                text-align: center;
                width: 80px;
                height: 80px;
                z-index: 20;
                position: absolute;
            }`;
    }
}

window.customElements.define('wtf-canvas', WtfCanvas);