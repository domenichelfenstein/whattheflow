export class MySimpleClass {
    DoSomething() {
        const button = new HTMLButtonElement();
        button.value = "Ich bin ein Button";
        
        document.appendChild(
            button
        );
    }
}

const obj = new MySimpleClass();
obj.DoSomething();