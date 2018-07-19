import { AbstractElement } from "./AbstractElement";

class MyElement extends AbstractElement {
    private name: string;

    getHtml() {
        return /*html*/`
            <style>
            span {
                color: red;
            }
            </style>
            <span>Inner Web Component: ${this.name}</span>`;
    }
}

window.customElements.define('my-element', MyElement);