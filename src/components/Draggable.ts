import { AbstractHtmlElement } from "../lib/AbstractHtmlElement";
import { IPlumbable } from "./Interfaces";
import { jsPlumbInstance } from "jsplumb";

import "../lib/string.extensions"

export class Draggable extends AbstractHtmlElement implements IPlumbable {
    private initialHtml: string;

    public anchors = [ "TopCenter", "BottomCenter", "LeftMiddle", "RightMiddle" ];

    public top: string;
    public left: string;

    getHtml() {
        return /*html*/`
            <style>
            </style>
            ${this.initialHtml}`;
    }

    connectedCallback() {
        this.initialHtml = this.innerHTML;

        super.connectedCallback();

        this.style.top = `${this.top}em`;
        this.style.left = `${this.left}em`;
    }

    apply(instance: jsPlumbInstance) {
        instance.draggable(this, <any>{ grid: [20, 20] });

        this.anchors.forEach(a => instance.addEndpoint(
            this,
            <any>Draggable.endpoint,
            <any>{
                anchor: a,
                isSource: true,
                isTarget: true,
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
        connector: ["Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],
        connectorStyle: Draggable.connectorPaintStyle,
        hoverPaintStyle: Draggable.endpointHoverStyle,
        connectorHoverStyle: Draggable.connectorHoverStyle,
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
        wtf-draggable {
            border: 1px solid #346789;
            box-shadow: 2px 2px 19px #aaa;
            -o-box-shadow: 2px 2px 19px #aaa;
            -webkit-box-shadow: 2px 2px 19px #aaa;
            -moz-box-shadow: 2px 2px 19px #aaa;
            -moz-border-radius: 0.5em;
            border-radius: 0.5em;
            opacity: 0.8;
            width: 80px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            text-align: center;
            z-index: 20;
            position: absolute;
            background-color: #eeeeef;
            color: black;
            font-family: helvetica, sans-serif;
            padding: 0.5em;
            font-size: 0.9em;
            -webkit-transition: -webkit-box-shadow 0.15s ease-in;
            -moz-transition: -moz-box-shadow 0.15s ease-in;
            -o-transition: -o-box-shadow 0.15s ease-in;
            transition: box-shadow 0.15s ease-in;
        }
        
        wtf-draggable:hover {
            box-shadow: 2px 2px 19px #444;
            -o-box-shadow: 2px 2px 19px #444;
            -webkit-box-shadow: 2px 2px 19px #444;
            -moz-box-shadow: 2px 2px 19px #444;
            opacity: 0.6;
        }
        </style>
        `;
    }
}

window.customElements.define('wtf-draggable', Draggable);