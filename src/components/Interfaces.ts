import { jsPlumbInstance } from "jsplumb";

export interface IPlumbable {
    apply(instance: jsPlumbInstance)
}