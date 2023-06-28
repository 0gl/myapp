class StringValidator {
    validate(str) {
        return typeof str === 'string' && str.trim() !== '';
    }
}

class NumberValidator {
    validate(num) {
        return typeof num === 'number' && !isNaN(num);
    }
}

module.exports = { StringValidator, NumberValidator };
