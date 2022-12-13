const Operators = {
    Add: "add",
    Substract: "substract",
    Multiply: "multiply",
    Divide: "divide"
}

function add(a, b) {
    return +a + +b;
}

function substract(a, b) {
    return +a - +b;
}

function multiply(a, b) {
    return +a * +b;
}

function divide(a, b) {
    if (a === 0 || b === 0) {
        return 0;
    }
    return +a / +b;
}

function operate(operator, a, b) {
    switch(operator) {
        case Operators.Add:
            resultValue = add(a, b);
        break;

        case Operators.Substract:
            resultValue = substract(a, b);
        break;

        case Operators.Multiply:
            resultValue = multiply(a, b);
        break;

        case Operators.Divide:
            resultValue = divide(a, b);
        break;

        default:
            resultValue = b;
    }
    displayValue = "";
    previousNumber = 0;
    currentNumber = 0;
    updateResultDisplay();
}

let displayValue = "";
let resultValue = "";
const operationDisplay = document.querySelector(".operation");
const resultDisplay = document.querySelector(".result");
let currentOperator = null;
let previousNumber = 0;
let currentNumber = 0;

function pressNumber(number) {
    if (String(currentNumber).length > 14) return;
    if (number === "." && currentNumber.toString().includes(number)) {
        return;
    }
    displayValue += number;
    if (currentNumber === 0) {
        currentNumber = "";
    }
    currentNumber = (currentNumber.toString() + number.toString());
    updateOperationDisplay();
}

function pressOperator(operator) {
    if (currentOperator !== null) {
        if (currentNumber === "") {
            currentOperator = operator;
            displayValue = displayValue.slice(0, displayValue.length-3);
        } else {
            operate(currentOperator, previousNumber, currentNumber);
            currentNumber = 0;
        }
    }

    switch(operator) {
        case Operators.Add:
            displayValue += " + ";
        break;

        case Operators.Substract:
            displayValue += " - ";
        break;

        case Operators.Multiply:
            displayValue += " * ";
        break;

        case Operators.Divide:
            displayValue += " / ";
        break;
    }
    currentOperator = operator;
    currentNumber === 0 ? previousNumber = resultValue : previousNumber = currentNumber;
    currentNumber = 0;
    updateOperationDisplay();
}

function updateOperationDisplay() {
    operationDisplay.textContent = displayValue;
}

function updateResultDisplay() {
    resultDisplay.textContent = resultValue;
}

function clear() {
    resultValue = 0;
    displayValue = "";
    currentNumber = 0;
    previousNumber = 0;
    currentOperator = null;
    updateOperationDisplay();
    updateResultDisplay();
}

function erase() {
    if (currentNumber !== 0) {
        currentNumber = (String(currentNumber).slice(0, String(currentNumber).length-1));
        displayValue = displayValue.slice(0, displayValue.length-1);
    } else if (currentOperator !== null) {
        currentOperator = null;
        displayValue = displayValue.slice(0, displayValue.length-3);
        !displayValue.includes(previousNumber) ? currentNumber = "" : currentNumber = previousNumber;
        previousNumber = 0;
    }
    updateOperationDisplay();
}

function pressKey(e) {
    console.log(e.key);
    const pressedButton = document.querySelector(`button[data-key="${e.key}"`);
    console.log(pressedButton);
    if (!pressedButton) return;

    if (pressedButton.classList.contains("erase")) {
        erase();
        return;
    } else if (pressedButton.classList.contains("clear")) {
        clear();
        return;
    }

    if (!pressedButton.classList.contains("operator")) {
        pressNumber(pressedButton.textContent)
    } else {
        switch (pressedButton.textContent) {
            case "+":
                pressOperator(Operators.Add);
            break;

            case "-":
                pressOperator(Operators.Substract);
            break;

            case "*":
                pressOperator(Operators.Multiply);
            break;

            case "/":
                pressOperator(Operators.Divide);
            break;

            case "=":
                operate(currentOperator, previousNumber, currentNumber);
                currentOperator = null;
            break;
        }
    }
}

addEventListeners();

function addEventListeners() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.classList.length === 0) {
            button.addEventListener('click', e => pressNumber(e.target.textContent))
        } else if (button.classList.contains("operator")) {
            button.addEventListener('click', e => {
                switch (e.target.textContent) {
                    case "+":
                        pressOperator(Operators.Add);
                    break;

                    case "-":
                        pressOperator(Operators.Substract);
                    break;

                    case "*":
                        pressOperator(Operators.Multiply);
                    break;

                    case "/":
                        pressOperator(Operators.Divide);
                    break;

                    case "=":
                        operate(currentOperator, previousNumber, currentNumber);
                        currentOperator = null;
                    break;
                }
            })
        }
        button.addEventListener('mouseenter', e => e.target.classList.toggle("highlighted"));
        button.addEventListener('mouseleave', e => e.target.classList.toggle("highlighted"));
    })
    document.querySelector(".clear").addEventListener('click', (e) => clear());
    document.querySelector(".erase").addEventListener('click', (e) => erase());
    window.addEventListener('keydown', pressKey);
}