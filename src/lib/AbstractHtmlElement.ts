import { Uuid } from "./Uuid";

declare var ShadyCSS: any;

export abstract class AbstractHtmlElement extends HTMLElement {
    protected getHtml() {
        return "";
    }

    connectedCallback() {
        for (let i = 0; i < this.attributes.length; i++) {
            const element = this.attributes[i];
            this[element.name] = element.value;
        }

        this.innerHTML = this.getHtml();
    }
}