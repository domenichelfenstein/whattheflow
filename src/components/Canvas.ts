import { AbstractHtmlElement } from "../lib/AbstractHtmlElement";
import { jsPlumb, jsPlumbInstance } from "jsplumb";

import "./Element";
import "./Connection";
import "./Level";
import { IPlumbable } from "./Interfaces";

class WtfCanvas extends AbstractHtmlElement {
    public width: string;
    public height: string;
    public zoomable = false;
    public zoom = 100;
    public zoomFactor = 3;

    private static minZoom = 25;
    private static maxZoom = 400;

    private jsPlumb: jsPlumbInstance;

    connectedCallback() {
        this.populateProperties();

        this.style.width = `${this.width}px`;
        this.style.height = `${this.height}px`;
        this.style.display = "block";
        this.style.padding = "10px";
        this.style.overflow = this.zoomable ? "auto" : "hidden";

        const children = this.childNodes;
        for (let i = 0; i < children.length; i++) {
            const c = children[i];
            this.removeChild(c);
        }

        const container = document.createElement("div");
        container.classList.add("wtf-inner-canvas");
        for (let i = 0; i < children.length; i++) {
            const c = children[i];
            container.appendChild(c);
        }
        this.appendChild(container);

        const style = document.createElement("style");
        style.innerHTML = this.getCss();
        this.appendChild(style);

        this.jsPlumb = jsPlumb.getInstance({
            DragOptions: { cursor: 'pointer', zIndex: 2000 },
            Container: container
        });

        for (let i = 0; i < container.children.length; i++) {
            const element = <IPlumbable><any>container.children[i];
            if (element.apply) {
                element.apply(this.jsPlumb);
            }
        }

        if(this.zoomable) {
            this.addEventListener('wheel', e => {
                this.zoom += (e.deltaY * this.zoomFactor);
                if(this.zoom > WtfCanvas.maxZoom) {
                    this.zoom = WtfCanvas.maxZoom;
                }
                if(this.zoom < WtfCanvas.minZoom) {
                    this.zoom = WtfCanvas.minZoom;
                }
                const zoom = this.zoom / 100;
                const x = parseInt((e.layerX / parseInt(this.width) * 100) + "");
                const y = parseInt((e.layerY / parseInt(this.height) * 100) + "");
                container.style.transform = `scale(${zoom})`;
                container.style.transformOrigin = `${x}% ${y}%`;
                this.jsPlumb["setZoom"](zoom);
            });
        }
    }
    getCss() {
        return `
            .wtf-inner-canvas {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                position: relative;
            }
            .jtk-overlay {
                font-family: "Arial", sans-serif;
                font-size: .8em;
                background: white;
                padding: 2px;
                border-radius: 3px;
            }
            wtf-connection {
                display: none;
            }
            wtf-level {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                flex: 1 1 auto;
            }
            wtf-element {
                display: flex;
                flex: 1 1 auto;
                justify-content: center;
                align-items: center;
                text-align: center;
                width: 80px;
                height: 80px;
                z-index: 20;
                position: absolute;
            }`;
    }
}

window.customElements.define('wtf-canvas', WtfCanvas);