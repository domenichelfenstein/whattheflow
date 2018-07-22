interface String {
    capitalizeFirstChar(): string;
    firstCharToLower(): string;
    paddingLeft(value): string;
    replaceAll(search, replacement): string;
    contains(text, ignoreCase?): boolean;
    cutOnEnd(numberOfChars: number): string;
    compare(other: string): number;
    decodeBase64(): string;
}

String.prototype.capitalizeFirstChar = function () {
    var first = this[0].toUpperCase();
    return first + this.substring(1, this.length);
}

String.prototype.firstCharToLower = function () {
    var first = this[0].toLowerCase();
    return first + this.substring(1, this.length);
}

String.prototype.paddingLeft = function (paddingValue) {
    return paddingValue.substring(0, paddingValue.length - this.length) + this;
};

String.prototype.replaceAll = function (search, replacement) {
    return this.split(search).join(replacement);
};

String.prototype.contains = function (text, ignoreCase = true) {
    if (ignoreCase) {
        return this.toLowerCase().search(text.toLowerCase()) >= 0;
    }
    return this.search(text) >= 0;
}

String.prototype.cutOnEnd = function (numberOfChars: number) {
    return this.substring(0, this.length - numberOfChars);
}

String.prototype.compare = function (other: string) {
    return Intl.Collator().compare(this, other);
}

String.prototype.decodeBase64 = function () {
    let padWithEqualSigns = (s) => {
        while (s.length % 4 !== 0) {
            s += '=';
        }
        return s;
    }

    let base64 = padWithEqualSigns(this)
        .replace(/\-/g, '+')
        .replace(/\_/g, '/');

    return decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}