const calcDisplay = document.querySelector(".calc-display");
const upperDisplay = document.querySelector(".upper-display");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const pointButton = document.querySelector(".point");
const backButton = document.querySelector(".back");
const numButtons = document.querySelectorAll(".digit");
const operateButtons = document.querySelectorAll(".operation");
let displayValue = "";
let upperValue = "---";
let num1;
let num2;
let operator;
let operationButtonPressed = false;
let secondNumEntered = false;
let pointPresent = false;
let chaining = false;


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
};

const reset = function () {
    displayValue = "0";
    upperValue = "---";
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    operationButtonPressed = false;
    secondNumEntered = false;
    chaining = false;

    updateDisplay();
}

const giveResult = function (event) {
    if (secondNumEntered) num2 = displayValue;
    
    if ((!num1 || !num2) && !chaining) {
        alert("Don't press the = button before entering both numbers!");
        return;
    }
    
    operationButtonPressed = false;

    displayValue = parseFloat(Number.parseFloat(operate(operator, num1, num2)).toFixed(6));
    if (displayValue === "Infinity") {
        alert("For the sake of humanity, DON'T try to divide by zero! Please!!");
        displayValue = "0";
        return;
    }

    if (chaining) {
        upperValue = displayValue;
    }
    else {
        upperValue += " " + num2 + " = ";
    }
    
    num1 = undefined;
    num2 = undefined;
    
    chaining = false;
    secondNumEntered = false;
    updateDisplay();
};


numButtons.forEach(btn => btn.addEventListener("click", event => {
    if (operationButtonPressed) {
        operationButtonPressed = false;
        upperValue = displayValue;
        clearDisplay();
        secondNumEntered = true;
    }

    
    let num = event.target.textContent;
    displayValue += num;

    updateDisplay();
}));

operateButtons.forEach(btn => btn.addEventListener("click", event => {
    if (secondNumEntered) {
        chaining = true;
        giveResult(event);
        secondNumEntered = false;
    }

    num1 = displayValue;
    operator = event.target.textContent;

    operationButtonPressed = true;
    displayValue += "  " + operator;
    updateDisplay();
}));

equalButton.addEventListener("click", giveResult);

clearButton.addEventListener("click", reset);

pointButton.addEventListener("click", event => {
    if (displayValue == Math.round(displayValue)) {
        pointPresent = false;
    }

    if (pointPresent) return;

    pointPresent = true;
    displayValue += event.target.textContent;
    updateDisplay();
});

backButton.addEventListener("click", event => {
    displayValue = displayValue.toString();
    displayValue = displayValue.slice(0, displayValue.length - 1);
    
    if (displayValue == "") displayValue = "0";
    displayValue = parseFloat(displayValue);
    updateDisplay();
});