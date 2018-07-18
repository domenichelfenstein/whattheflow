declare var ShadyCSS: any;

export abstract class AbstractElement extends HTMLElement {
    abstract getHtml(): string;

    connectedCallback() {

        var shadow = this.attachShadow({mode: 'closed'});

        var template = document.createElement("template");
        
        template.innerHTML = this.getHtml();

        shadow.appendChild(template);

        ShadyCSS.prepareTemplate(template, this.generateUUID());

        ShadyCSS.styleElement(this);

        shadow.appendChild(template.content.cloneNode(true));
    }

    private generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now(); //use high-precision timer if available
        }
        return 'axxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}