import { AbstractHtmlElement } from "../lib/AbstractHtmlElement";
import { IPlumbable } from "./Interfaces";
import { jsPlumbInstance } from "jsplumb";

export class Draggable extends AbstractHtmlElement implements IPlumbable {
    public number: string;

    public top: string;
    public left: string;

    getHtml() {
        return /*html*/`
            <style>
            </style>
            <strong>New: ${this.number}</strong><br/><br/>`;
    }

    connectedCallback() {
        super.connectedCallback();

        this.id = `flowchartWindow${this.number}`;
        this.style.top = `${this.top}em`;
        this.style.left = `${this.left}em`;
    }
    
    apply(instance: jsPlumbInstance) {
        instance.draggable(this);
    }

    public static getCss() {
        return /*html*/`
        <style>
        wtf-draggable {
            border: 1px solid #346789;
            box-shadow: 2px 2px 19px #aaa;
            -o-box-shadow: 2px 2px 19px #aaa;
            -webkit-box-shadow: 2px 2px 19px #aaa;
            -moz-box-shadow: 2px 2px 19px #aaa;
            -moz-border-radius: 0.5em;
            border-radius: 0.5em;
            opacity: 0.8;
            width: 80px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            text-align: center;
            z-index: 20;
            position: absolute;
            background-color: #eeeeef;
            color: black;
            font-family: helvetica, sans-serif;
            padding: 0.5em;
            font-size: 0.9em;
            -webkit-transition: -webkit-box-shadow 0.15s ease-in;
            -moz-transition: -moz-box-shadow 0.15s ease-in;
            -o-transition: -o-box-shadow 0.15s ease-in;
            transition: box-shadow 0.15s ease-in;
        }
        
        wtf-draggable:hover {
            box-shadow: 2px 2px 19px #444;
            -o-box-shadow: 2px 2px 19px #444;
            -webkit-box-shadow: 2px 2px 19px #444;
            -moz-box-shadow: 2px 2px 19px #444;
            opacity: 0.6;
        }
        </style>
        `;
    }
}

window.customElements.define('wtf-draggable', Draggable);