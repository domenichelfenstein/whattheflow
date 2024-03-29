import { AbstractHtmlElement } from "../lib/AbstractHtmlElement";
import { IPlumbable } from "./Interfaces";
import { jsPlumbInstance } from "jsplumb";

import "./Element";
import { WtfElement } from "./Element";

export class WtfLevel extends AbstractHtmlElement implements IPlumbable {

    apply(instance: jsPlumbInstance) {
        var elements: WtfElement[] = [];
        for (let i = 0; i < this.children.length; i++) {
            const item = <WtfElement><any>this.children[i];
            if (item.apply) {
                elements.push(item);
            }
        }

        const count = elements.length;
        for (let i = 0; i < count; i++) {
            const element = elements[i];

            const w = element.clientWidth;
            const m = 40;
            const left = (this.clientWidth / 2) - ((count * w + (count - 1) * m) / 2) + (i * (w + m));

            element["left"] = left + "";

            if (element.apply) {
                element.apply(instance);
            }
        }
    }

    connectedCallback() {
        this.populateProperties();
    }
}

window.customElements.define('wtf-level', WtfLevel);