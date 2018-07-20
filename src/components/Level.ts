import { AbstractHtmlElement } from "../lib/AbstractHtmlElement";
import { IPlumbable } from "./Interfaces";
import { jsPlumbInstance } from "jsplumb";

import { Uuid } from "../lib/Uuid";

declare var ShadyCSS: any;

import "./Element";
import { WtfElement } from "./Element";

export class WtfLevel extends AbstractHtmlElement implements IPlumbable {
    apply(instance: jsPlumbInstance) {
        var elements: WtfElement[] = [];
        for (let i = 0; i < this.shadow.children.length; i++) {
            const item = <WtfElement><any>this.shadow.children[i];
            if(item.apply) {
                elements.push(item);
            }
        }

        const count = elements.length;
        for (let i = 0; i < count; i++) {
            const element = elements[i];
            
            const w = element.clientWidth;
            const m = 40;
            const left = (this.clientWidth / 2) - ((count * w + (count-1) * m) / 2) + (i * (w + m));

            element["top"] = "0";
            element["left"] = left + "";
            
            if(element.apply) {
                element.apply(instance);
            }
        }
    }

    connectedCallback() {
        var template = document.createElement("template");

        template.innerHTML = this.innerHTML;

        this.shadow.appendChild(template);
        ShadyCSS.prepareTemplate(template, Uuid.generateUUID());
        ShadyCSS.styleElement(this);
        this.shadow.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('wtf-level', WtfLevel);