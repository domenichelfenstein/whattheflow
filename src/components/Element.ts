import { AbstractHtmlElement } from "../lib/AbstractHtmlElement";
import { IPlumbable } from "./Interfaces";
import { jsPlumbInstance } from "jsplumb";

import "../lib/string.extensions"
import { Direction, toEndpointName } from "./Common";

export class WtfElement extends AbstractHtmlElement implements IPlumbable {
    private initialHtml: string;

    public endpoints = "['top', 'right', 'bottom', 'left']";
    public top = "";
    public left = "";

    private get endpointArray() {
        return JSON.parse(this.endpoints.replaceAll("'", "\""));
    }

    private get anchors() {
        var result = [];

        for (let i = 0; i < this.endpointArray.length; i++) {
            const direction = <Direction>this.endpointArray[i];
            result.push(toEndpointName(direction));
        }

        return result;
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
        if(this.draggable) {
            instance.draggable(this, <any>{ grid: [20, 20] });
        }

        this.style.top = `${this.top}px`;
        this.style.left = `${this.left}px`;
        
        this.anchors.forEach(a => instance.addEndpoint(
            this,
            <any>this.endpoint,
            <any>{
                anchor: a,
                isSource: true,
                isTarget: true,
                maxConnections: -1,
                uuid: `${this.id}${a}`
            }));
    }

    private static connectorPaintStyle = {
        strokeWidth: 2,
        stroke: "#61B7CF",
        joinstyle: "round",
        outlineStroke: "white",
        outlineWidth: 2
    };

    private static connectorHoverStyle = {
        strokeWidth: 3,
        stroke: "#216477",
        outlineWidth: 5,
        outlineStroke: "white"
    };

    private static endpointHoverStyle = {
        fill: "#216477",
        stroke: "#216477"
    };

    private endpoint = {
        endpoint: "Dot",
        paintStyle: {
            stroke: "#7AB02C",
            fill: "transparent",
            radius: 7,
            strokeWidth: 1
        },
        isSource: true,
        connector: ["Flowchart", { stub: [20, 20], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],
        connectorStyle: WtfElement.connectorPaintStyle,
        hoverPaintStyle: WtfElement.endpointHoverStyle,
        connectorHoverStyle: WtfElement.connectorHoverStyle,
        dragOptions: {},
        overlays: [
            ["Label", {
                location: [0.5, 1.5],
                label: "Drag",
                cssClass: "endpointSourceLabel",
                visible: false
            }]
        ]
    }
}

window.customElements.define('wtf-element', WtfElement);