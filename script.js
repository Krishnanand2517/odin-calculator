const calcDisplay = document.querySelector(".calc-display");
const upperDisplay = document.querySelector(".upper-display");
const numButtons = document.querySelectorAll(".digit");
const operateButtons = document.querySelectorAll(".operation");
const equalButton = document.querySelector(".equal");
let displayValue = "";
let upperValue = "---";
let num1;
let num2;
let operator;
let operationButtonPressed = false;


const add = (a, b) => +a + +b;
const subtract = (a, b) => +a - +b;
const multiply = (a, b) => +a * +b;
const divide = (a, b) => +a / +b;

const operate = function (operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    
        default:
            break;
    }
};

const updateDisplay = function () {
    calcDisplay.textContent = displayValue;
    upperDisplay.textContent = upperValue;
};

const clearDisplay = function () {
    displayValue = "";
    updateDisplay();
}


numButtons.forEach(btn => btn.addEventListener("click", event => {
    if (operationButtonPressed) {
        upperValue = displayValue;
        clearDisplay();
    }

    let num = event.target.textContent;
    displayValue += num;
    updateDisplay();
}));

operateButtons.forEach(btn => btn.addEventListener("click", event => {
    num1 = displayValue;
    operator = event.target.textContent;

    operationButtonPressed = true;
    displayValue += "  " + operator;
    updateDisplay();
}));

equalButton.addEventListener("click", event => {
    num2 = displayValue;
    upperValue += " " + num2;
    operationButtonPressed = false;

    displayValue = operate(operator, num1, num2);
    updateDisplay();
})