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

    apply(instance: jsPlumbInstance) {
        instance.connect(<any>{
            uuids: [`${this.from}${toEndpointName(this.source)}`, `${this.to}${toEndpointName(this.target)}`],
            editable: true
        });
    }
}

window.customElements.define('wtf-connection', WtfConnection);