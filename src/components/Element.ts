import { AbstractHtmlElement } from "../lib/AbstractHtmlElement";
import { IPlumbable } from "./Interfaces";
import { jsPlumbInstance } from "jsplumb";

import "../lib/string.extensions"
import { Direction, toEndpointName } from "./Common";

export class WtfElement extends AbstractHtmlElement implements IPlumbable {
    private initialHtml: string;

    public endpoints = "['top', 'right', 'bottom', 'left']";
    public background = "#eeeeef";
    public foreground = "black";
    public top: string;
    public left: string;

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
            </style>
            ${this.initialHtml}`;
    }

    connectedCallback() {
        this.initialHtml = this.innerHTML;

        super.connectedCallback();

        this.style.top = `${this.top}px`;
        this.style.left = `${this.left}px`;
        this.style.backgroundColor = this.background;
        this.style.color = this.foreground;
    }

    apply(instance: jsPlumbInstance) {
        if(this.draggable) {
            instance.draggable(this, <any>{ grid: [20, 20] });
        }
        
        this.anchors.forEach(a => instance.addEndpoint(
            this,
            <any>WtfElement.endpoint,
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

    private static endpoint = {
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

    public static getCss() {
        return /*html*/`
        <style>
        wtf-element {
            border: 1px solid #346789;
            box-shadow: 2px 2px 19px #aaa;
            border-radius: 0.5em;
            opacity: 0.8;
            width: 80px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            text-align: center;
            z-index: 20;
            position: absolute;
            font-family: helvetica, sans-serif;
            padding: 0.5em;
            font-size: 0.9em;
            transition: box-shadow 0.15s ease-in;
        }
        
        wtf-element:hover {
            box-shadow: 2px 2px 19px #444;
            opacity: 0.6;
        }
        </style>
        `;
    }
}

window.customElements.define('wtf-element', WtfElement);