export class MySimpleClass {
    DoSomething() {
        const button = document.createElement("BUTTON");
        button.innerText = "Ich bin ein Button";
        
        document.body.appendChild(
            button
        );
    }
}