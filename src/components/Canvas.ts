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

    connectedCallback() {
        this.populateProperties();

        this.style.width = `${this.width}px`;
        this.style.height = `${this.height}px`;
        this.style.display = "flex";
        this.style.flexDirection = "column";
        this.style.overflow = "auto";
        this.style.position = "relative";
        this.style.padding = ".5em";

        const style = document.createElement("style");
        style.innerHTML = this.getCss();
        this.appendChild(style);

        const instance = jsPlumb.getInstance({
            DragOptions: { cursor: 'pointer', zIndex: 2000 },
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
            .jtk-overlay {
                font-family: "Arial", sans-serif;
                font-size: .8em;
                background: white;
                padding: 2px;
                border-radius: 3px;
            }
            wtf-connection {
                display: none;
            }
            wtf-level {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                flex: 1 1 auto;
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