import { AbstractHtmlElement } from "../lib/AbstractHtmlElement";
import { IPlumbable } from "./Interfaces";
import { jsPlumbInstance } from "jsplumb";

import "../lib/string.extensions";
import "../lib/array.extensions";
import { Direction, EndpointType, toEndpointName, ConnectorType } from "./Common";

export class WtfConnection extends AbstractHtmlElement implements IPlumbable {
    public from: string;
    public to: string;
    public source: Direction;
    public target: Direction;
    public endpoint: EndpointType = "blank";
    public connector: ConnectorType = "straight";
    // public editable = false;

    apply(instance: jsPlumbInstance) {
        instance.connect(<any>{
            source: this.from,
            target: this.to,
            anchors: [ toEndpointName(this.source), toEndpointName(this.target) ],
            editable: false,
            endpoint: this.endpoint.capitalizeFirstChar(),
            endpointStyle: WtfConnection.endpointPaintStyle,
            hoverPaintStyle: WtfConnection.endpointHoverStyle,
            connector: this.getConnector(),
            connectorStyle: WtfConnection.connectorPaintStyle,
            connectorHoverStyle: WtfConnection.connectorHoverStyle
        });
    }

    private getConnector() {
        switch(this.connector) {
            case "flowchart":
                return [
                    "Flowchart",
                    { 
                        stub: [0, 0],
                        gap: this.endpoint == "blank"
                            ? 0
                            : 10,
                        cornerRadius: 5,
                        alwaysRespectStubs: true
                    }
                ];
            case "bezier":
                return [
                    "Bezier",
                    {
                        curviness: 75
                    }
                ];
            case "straight":
            default:
                return "Straight";
        }
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

    private static fromConnectorToString(ct: ConnectorType) {
        return ct
            .replaceAll("-", " ")
            .split(" ")
            .select(x => x.capitalizeFirstChar())
            .join();
    }
}

window.customElements.define('wtf-connection', WtfConnection);