import { AbstractHtmlElement } from "../lib/AbstractHtmlElement";
import { IPlumbable } from "./Interfaces";
import { jsPlumbInstance } from "jsplumb";

import "../lib/string.extensions";

export class Connection extends AbstractHtmlElement implements IPlumbable {
    public from: string;
    public to: string;
    public source: Direction;
    public target: Direction;

    apply(instance: jsPlumbInstance) {
        instance.connect(<any>{
            uuids: [`${this.from}${this.getEndPoint(this.source)}`, `${this.to}${this.getEndPoint(this.target)}`],
            editable: true
        });
    }

    private getEndPoint(direction: Direction) {
        switch(direction) {
            case "top":
                return "TopCenter";
            case "right":
                return "RightMiddle";
            case "bottom":
                return "BottomCenter";
            case "left":
                return "LeftMiddle";
        }
        
        return "";
    }
}

export type Direction = "top" | "right" | "bottom" | "left";

window.customElements.define('wtf-connection', Connection);