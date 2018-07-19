import { AbstractElement } from "./AbstractElement";
import "./MyElement";

class MyApplication extends AbstractElement {
    getHtml() {
        return /*html*/`
            <style>
            h1 {
                color: blue;
            }
            </style>
            <h1>Web Component</h1>
            <my-element name="Hans"></my-element>`;
    }
}

window.customElements.define('my-application', MyApplication);