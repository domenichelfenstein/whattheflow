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
    }
</style>
<div id="diagramContainer">
    <div id="item_left"  class="item"></div>
    <div id="item_right" class="item" style="margin-left:50px;"></div>
</div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();

        const instance = jsPlumb.getInstance();
        instance.setContainer("diagramContainer");

        const left = <Element>this.shadow.querySelector("#item_left");
        const right = <Element>this.shadow.querySelector("#item_right");

        var common = {
            connector: ["Straight"],
            anchor: ["Left", "Right"],
            endpoint:"Dot"
        };

        instance.connect({
            source: left,
            target: right
        },
        common);

        instance.draggable(left);
        instance.draggable(right);
    }
}

window.customElements.define('wtf-model', Model);