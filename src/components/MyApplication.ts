import { AbstractHtmlElement } from "../lib/AbstractHtmlElement";
import "./Model";

class MyApplication extends AbstractHtmlElement {
    getHtml() {
        return /*html*/`
            <style>
            h1 {
                color: blue;
            }
            </style>
            <h1>Web Component</h1>
            <wtf-model width="200", height="500"></wtf-model>`;
    }
}

window.customElements.define('my-application', MyApplication);