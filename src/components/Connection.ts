import { AbstractHtmlElement } from "../lib/AbstractHtmlElement";
import { IPlumbable } from "./Interfaces";
import { jsPlumbInstance } from "jsplumb";

import "../lib/string.extensions";
import { Direction, toEndpointName } from "./Common";

export class WtfConnection extends AbstractHtmlElement implements IPlumbable {
    public from: string;
    public to: string;
    public source: Direction;
    public target: Direction;
    // public editable = false;

    apply(instance: jsPlumbInstance) {
        instance.connect(<any>{
            source: this.from,
            target: this.to,
            anchors: [ toEndpointName(this.source), toEndpointName(this.target) ],
            editable: false,
            connector: ["Flowchart", { stub: [0, 0], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],
            endpoint: "Dot",
            endpointStyle: WtfConnection.endpointPaintStyle,
            connectorStyle: WtfConnection.connectorPaintStyle,
            hoverPaintStyle: WtfConnection.endpointHoverStyle,
            connectorHoverStyle: WtfConnection.connectorHoverStyle
        });
    }

    private static endpointPaintStyle = {
        stroke: "#7AB02C",
        fill: "transparent",
        radius: 7,
        strokeWidth: 1
    };

    private static connectorPaintStyle = {
        strokeWidth: 2,
        stroke: "#61B7CF",
        joinstyle: "round",
        outlineStroke: "white",
        outlineWidth: 2
    };

    private static connectorHoverStyle = {
        stroke: "#216477"
    };

    private static endpointHoverStyle = {
        fill: "#216477",
        stroke: "#216477"
    };
}

window.customElements.define('wtf-connection', WtfConnection);