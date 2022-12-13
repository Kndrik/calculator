const Operators = {
    Add: "add",
    Substract: "substract",
    Multiply: "multiply",
    Divide: "divide"
}

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch(operator) {
        case Operators.Add:
            return add(a, b);
        break;

        case Operators.Substract:
            return substract(a, b);
        break;

        case Operators.Multiply:
            return multiply(a, b);
        break;

        case Operators.Divide:
            return divide(a, b);
        break;
    }
}