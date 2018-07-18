import { AbstractElement } from "./AbstractElement";

class MyApplication extends AbstractElement {
    getHtml() {
        return /*html*/`
            <style>
            h1 {
                color: blue;
            }
            </style>
            <h1>Web Component</h1>`;
    }
}

window.customElements.define('my-application', MyApplication);