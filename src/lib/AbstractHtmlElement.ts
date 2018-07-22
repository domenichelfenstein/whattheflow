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

        var template = document.createElement("template");

        template.innerHTML = this.getHtml();

        this.innerHTML = "";
        this.appendChild(template);
        ShadyCSS.prepareTemplate(template, Uuid.generateUUID());
        ShadyCSS.styleElement(this);
        this.appendChild(template.content.cloneNode(true));
    }
}