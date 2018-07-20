import { AbstractHtmlElement } from "../lib/AbstractHtmlElement";
import { jsPlumb } from "jsplumb";

import "./Draggable";
import "./Connection";
import { Draggable } from "./Draggable";
import { IPlumbable } from "./Interfaces";

class Canvas extends AbstractHtmlElement {
    private initialHtml: string;

    public width: string;
    public height: string;

    getHtml() {
        return /*html*/`
            ${Draggable.getCss()}
            <style>
            #canvas {
                position: relative;
                border: 2px solid gray;
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

    connectedCallback() {
        this.initialHtml = this.innerHTML;

        super.connectedCallback();

        const canvas = this.shadow.querySelector("#canvas");
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
}

window.customElements.define('wtf-canvas', Canvas);