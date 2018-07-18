import { AbstractElement } from "./AbstractElement";

class MyElement extends AbstractElement {
    getHtml() {
        return /*html*/`
            <style>
            span {
                color: red;
            }
            </style>
            <span>Inner Web Component</span>`;
    }
}

window.customElements.define('my-element', MyElement);