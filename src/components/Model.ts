import { AbstractHtmlElement } from "../lib/AbstractHtmlElement";
import { jsPlumb, jsPlumbInstance } from "jsplumb";

import "./Draggable";
import { Draggable } from "./Draggable";
import { IPlumbable } from "./Interfaces";

// http://www.freedevelopertutorials.com/jsplumb-tutorial/connections/
class Model extends AbstractHtmlElement {
    public width: string;
    public get intWidth() {
        return parseInt(this.width);
    }

    public height: string;
    public get intHeight() {
        return parseInt(this.height);
    }

    public jsPlumbInstance: jsPlumbInstance;

    prepare() {
        const canvas = this.shadow.querySelector("#canvas");

        this.jsPlumbInstance = window["jsp"] = jsPlumb.getInstance({
            DragOptions: { cursor: 'pointer', zIndex: 2000 },
            ConnectionOverlays: [
                [ "Arrow", {
                    location: 1,
                    visible:true,
                    width:11,
                    length:11,
                    id:"ARROW",
                    events:{
                        click:() => { alert("you clicked on the arrow overlay")}
                    }
                } ],
                [ "Label", {
                    location: 0.1,
                    id: "label",
                    cssClass: "aLabel",
                    events:{
                        tap:() => { alert("hey"); }
                    }
                }]
            ],
            Container: canvas
        });

        for (let i = 0; i < canvas.children.length; i++) {
            const element = <IPlumbable><any>canvas.children[i];
            element.apply(this.jsPlumbInstance);
        }
    }

    getHtml() {
        return /*html*/`
${Draggable.getCss()}
${Model.getCss()}
<div class="flowchart-demo" id="canvas">
    <wtf-draggable number="1" top="34" left="5"></wtf-draggable>
    <wtf-draggable number="2" top="7" left="36"></wtf-draggable>
    <wtf-draggable number="3" top="27" left="48"></wtf-draggable>
    <wtf-draggable number="4" top="23" left="22"></wtf-draggable>
</div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        
        this.prepare();
    
        var basicType = {
            connector: "StateMachine",
            paintStyle: { stroke: "red", strokeWidth: 4 },
            hoverPaintStyle: { stroke: "blue" },
            overlays: [
                "Arrow"
            ]
        };
        this.jsPlumbInstance.registerConnectionType("basic", basicType);
    
        // this is the paint style for the connecting lines..
        var connectorPaintStyle = {
                strokeWidth: 2,
                stroke: "#61B7CF",
                joinstyle: "round",
                outlineStroke: "white",
                outlineWidth: 2
            },
        // .. and this is the hover style.
            connectorHoverStyle = {
                strokeWidth: 3,
                stroke: "#216477",
                outlineWidth: 5,
                outlineStroke: "white"
            },
            endpointHoverStyle = {
                fill: "#216477",
                stroke: "#216477"
            },
        // the definition of source endpoints (the small blue ones)
            sourceEndpoint = {
                endpoint: "Dot",
                paintStyle: {
                    stroke: "#7AB02C",
                    fill: "transparent",
                    radius: 7,
                    strokeWidth: 1
                },
                isSource: true,
                connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
                connectorStyle: connectorPaintStyle,
                hoverPaintStyle: endpointHoverStyle,
                connectorHoverStyle: connectorHoverStyle,
                dragOptions: {},
                overlays: [
                    [ "Label", {
                        location: [0.5, 1.5],
                        label: "Drag",
                        cssClass: "endpointSourceLabel",
                        visible:false
                    } ]
                ]
            },
        // the definition of target endpoints (will appear when the user drags a connection)
            targetEndpoint = {
                endpoint: "Dot",
                paintStyle: { fill: "#7AB02C", radius: 7 },
                hoverPaintStyle: endpointHoverStyle,
                maxConnections: -1,
                dropOptions: { hoverClass: "hover", activeClass: "active" },
                isTarget: true,
                overlays: [
                    [ "Label", { location: [0.5, -0.5], label: "Drop", cssClass: "endpointTargetLabel", visible:false } ]
                ]
            },
            init = (connection) => {
                connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + "-" + connection.targetId.substring(15));
            };
    
        var _addEndpoints = (toId, sourceAnchors, targetAnchors) => {
            for (var i = 0; i < sourceAnchors.length; i++) {
                var sourceUUID = toId + sourceAnchors[i];
                this.jsPlumbInstance.addEndpoint(<any>this.shadow.querySelector("#flowchart" + toId), <any>sourceEndpoint, <any>{
                    anchor: sourceAnchors[i], uuid: sourceUUID
                });
            }
            for (var j = 0; j < targetAnchors.length; j++) {
                var targetUUID = toId + targetAnchors[j];
                this.jsPlumbInstance.addEndpoint(<any>this.shadow.querySelector("#flowchart" + toId), <any>targetEndpoint, <any>{ anchor: targetAnchors[j], uuid: targetUUID });
            }
        };
    
        // suspend drawing and initialise.
        this.jsPlumbInstance.batch(() => {
    
            _addEndpoints("Window4", ["TopCenter", "BottomCenter"], ["LeftMiddle", "RightMiddle"]);
            _addEndpoints("Window2", ["LeftMiddle", "BottomCenter"], ["TopCenter", "RightMiddle"]);
            _addEndpoints("Window3", ["RightMiddle", "BottomCenter"], ["LeftMiddle", "TopCenter"]);
            _addEndpoints("Window1", ["LeftMiddle", "RightMiddle"], ["TopCenter", "BottomCenter"]);
    
            // listen for new connections; initialise them the same way we initialise the connections at startup.
            this.jsPlumbInstance.bind("connection", (connInfo, originalEvent) => {
                init(connInfo.connection);
            });
    
            // make all the window divs draggable
            // instance.draggable(jsPlumb["getSelector"](".flowchart-demo .window"), <any>{ grid: [20, 20] });
            // THIS DEMO ONLY USES getSelector FOR CONVENIENCE. Use your library's appropriate selector
            // method, or document.querySelectorAll:
            //jsPlumb.draggable(document.querySelectorAll(".window"), { grid: [20, 20] });
    
            // connect a few up
            this.jsPlumbInstance.connect(<any>{uuids: ["Window2BottomCenter", "Window3TopCenter"], editable: true});
            this.jsPlumbInstance.connect(<any>{uuids: ["Window2LeftMiddle", "Window4LeftMiddle"], editable: true});
            this.jsPlumbInstance.connect(<any>{uuids: ["Window4TopCenter", "Window4RightMiddle"], editable: true});
            this.jsPlumbInstance.connect(<any>{uuids: ["Window3RightMiddle", "Window2RightMiddle"], editable: true});
            this.jsPlumbInstance.connect(<any>{uuids: ["Window4BottomCenter", "Window1TopCenter"], editable: true});
            this.jsPlumbInstance.connect(<any>{uuids: ["Window3BottomCenter", "Window1BottomCenter"], editable: true});
            //
    
            //
            // listen for clicks on connections, and offer to delete connections on click.
            //
            this.jsPlumbInstance.bind("click", (conn, originalEvent) => {
               // if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
                 //   instance.detach(conn);
                conn["toggleType"]("basic");
            });
    
            this.jsPlumbInstance.bind("connectionDrag", (connection) => {
                console.log("connection " + connection["id"] + " is being dragged. suspendedElement is ", connection["suspendedElement"], " of type ", connection["suspendedElementType"]);
            });
    
            this.jsPlumbInstance.bind("connectionDragStop", (connection) => {
                console.log("connection " + connection["id"] + " was dragged");
            });
    
            this.jsPlumbInstance.bind("connectionMoved", (params) => {
                console.log("connection " + params.connection.id + " was moved");
            });
        });
    
        jsPlumb["fire"]("jsPlumbDemoLoaded", this.jsPlumbInstance);
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

window.customElements.define('wtf-model', Model);