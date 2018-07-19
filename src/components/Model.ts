import { AbstractHtmlElement } from "../lib/AbstractHtmlElement";
import { jsPlumb, Endpoint } from "jsplumb";

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

    getHtml() {
        return /*html*/`
<style>
    #diagramContainer {
        padding: 20px;
        width:80%; height: 200px;
        border: 1px solid gray;
    }
    
    .item {
        height:80px; width: 80px;
        border: 1px solid blue;
        float: left;
        position: absolute;
    }
    #item_right {
        left: 180px;
    }
</style>
<div id="diagramContainer">
    <div id="item_left"  class="item"></div>
    <div id="item_right" class="item"></div>
</div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();

        const instance = jsPlumb.getInstance();
        instance.setContainer("diagramContainer");

        const left = <Element>this.shadow.querySelector("#item_left");
        const right = <Element>this.shadow.querySelector("#item_right");

        var common = <any>{
            overlays: [["Arrow", { width: 12, length: 12, location: 0.67 }]],
            connector: ["Straight"],
            anchor: ["Left", "Right"],
            endpoint: "Dot",
            isSource:true,
            isTarget:true
        };

        var gridDefinition = <any>{ grid:[10,10] };

        instance.draggable(left, gridDefinition);
        instance.addEndpoint(
            left,
            <any>{
                anchor: "Right"
            },
            common);

        instance.draggable(right, gridDefinition);
        instance.addEndpoint(
            right,
            <any>{
                anchor: "Left"
            },
            common);

        // instance.connect(
        //     {
        //         source: left,
        //         target: right
        //     },
        //     common);

        // instance.draggable(left);
        // instance.draggable(right);
    }
}

window.customElements.define('wtf-model', Model);