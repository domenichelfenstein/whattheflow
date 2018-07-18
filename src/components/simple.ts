class MyElement extends HTMLElement {
    constructor() {
        super();

        var shadow = this.attachShadow({mode: 'open'});
        var wrapper = document.createElement('span');
        wrapper.innerText = "Dies ist eine Custom Web Component";
        shadow.appendChild(wrapper);
    }
}

customElements.define('my-element', MyElement);