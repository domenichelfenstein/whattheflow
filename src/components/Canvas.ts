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
        this.initialHtml = this.innerHTML;

        super.connectedCallback();

        const canvas = this.querySelector("#canvas");
        const instance = jsPlumb.getInstance({
            DragOptions: { cursor: 'pointer', zIndex: 2000 },
            ConnectionOverlays: [
                [ "Arrow", {
                    location: 1,
                    visible:true,
                    width:11,
                    length:11
                } ]
            ],
            Container: canvas
        });

        for (let i = 0; i < canvas.children.length; i++) {
            const element = <IPlumbable><any>canvas.children[i];
            if(element.apply) {
                element.apply(instance);
            }
        }
    }
    getHtml() {
        return /*html*/`
            <style>
            wtf-level {
                display: flex;
                justify-content: center;
                margin: 1em;
                height: 90px;
                position: relative;
            }
            wtf-element {
                display: flex;
                width: 80px;
                height: 80px;
                z-index: 20;
                position: absolute;
            }
            #canvas {
                position: relative;
                border: 2px solid lightgray;
                border-radius: 5px;
                width: ${this.width}px;
                height: ${this.height}px;
                overflow: auto;
            }
            </style>
            <div id="canvas">
                ${this.initialHtml}
            </div>
        `;
    }
}

window.customElements.define('wtf-canvas', WtfCanvas);