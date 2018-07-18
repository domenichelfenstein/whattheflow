import "@webcomponents/webcomponentsjs";

class MyApplication extends HTMLElement {
    constructor() {
        super();

        var shadow = this.attachShadow({mode: 'open'});
        var wrapper = document.createElement('div');
        
        wrapper.innerHTML = /*html*/`
            <style>
            :host {
                color: blue;
            }
            </style>
            <h1>Web Component</h1>`;
        shadow.appendChild(wrapper);
    }
}

customElements.define('my-application', MyApplication);