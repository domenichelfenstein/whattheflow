interface Array<T> {
    select<T2>(f: (x: T) => T2): T2[];
}

Array.prototype.select = function (f: Function) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        const element = this[i];
        result.push(f(element));
    }

    return result;
}