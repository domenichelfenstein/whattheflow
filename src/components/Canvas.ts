import { AbstractHtmlElement } from "../lib/AbstractHtmlElement";
import { jsPlumb } from "jsplumb";

import "./Draggable";
import { Draggable } from "./Draggable";
import { IPlumbable } from "./Interfaces";

class Canvas extends AbstractHtmlElement {
    private initialHtml: string;

    getHtml() {
        return /*html*/`
${Draggable.getCss()}
${Canvas.getCss()}
<div class="flowchart-demo" id="canvas">
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
                    length:11,
                    id:"ARROW"
                } ],
                [ "Label", {
                    location: 0.1,
                    id: "label",
                    cssClass: "aLabel"
                }]
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

    public static getCss() {
        return /*html*/`
<style>
.flowchart-demo .active {
    border: 1px dotted green;
}

.flowchart-demo .hover {
    border: 1px dotted red;
}

.flowchart-demo .jtk-connector {
    z-index: 4;
}

.flowchart-demo .jtk-endpoint, .endpointTargetLabel, .endpointSourceLabel {
    z-index: 21;
    cursor: pointer;
}

.flowchart-demo .aLabel {
    background-color: white;
    padding: 0.4em;
    font: 12px sans-serif;
    color: #444;
    z-index: 21;
    border: 1px dotted gray;
    opacity: 0.8;
    cursor: pointer;
}

.flowchart-demo .aLabel.jtk-hover {
    background-color: #5C96BC;
    color: white;
    border: 1px solid white;
}

.jtk-drag {
    outline: 4px solid pink !important;
}

path, .jtk-endpoint {
    cursor: pointer;
}

.jtk-overlay {
    background-color:transparent;
}
</style>
        `;
    }
}

window.customElements.define('wtf-canvas', Canvas);