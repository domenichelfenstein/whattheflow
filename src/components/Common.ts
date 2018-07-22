export type Direction = "top" | "right" | "bottom" | "left";

export function toEndpointName(direction: Direction) {
    switch (direction) {
        case "top":
            return "TopCenter";
        case "right":
            return "RightMiddle";
        case "bottom":
            return "BottomCenter";
        case "left":
            return "LeftMiddle";
    }

    return "";
}