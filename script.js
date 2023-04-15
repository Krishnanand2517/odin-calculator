const calcDisplay = document.querySelector(".calc-display");
const upperDisplay = document.querySelector(".upper-display");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const pointButton = document.querySelector(".point");
const backButton = document.querySelector(".back");
const numButtons = document.querySelectorAll(".digit");
const operateButtons = document.querySelectorAll(".operation");

const allButtons = document.querySelectorAll("button");

let displayValue = "";
let upperValue = "";
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
        case "x":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    
        default:
            break;
    }
};

// Updates the display after every key pressed
const updateDisplay = function () {
    if (displayValue == "") displayValue = "0";

    calcDisplay.textContent = displayValue;
    upperDisplay.textContent = upperValue;

    if (displayValue == "0") displayValue = "";
};

const clearDisplay = function () {
    displayValue = "";
    updateDisplay();
};

// Start again with an empty slate!
const reset = function () {
    displayValue = "0";
    upperValue = "";
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    operationButtonPressed = false;
    secondNumEntered = false;
    chaining = false;

    updateDisplay();
};

// Enter a digit
const appendNumber = function (value) {
    if (operationButtonPressed) {
        operationButtonPressed = false;
        upperValue = displayValue;
        clearDisplay();
        secondNumEntered = true;
    }
    
    let num = value;
    displayValue += num;

    updateDisplay();
};

// Enter a decimal point
const appendPointer = function () {
    if (!displayValue.includes("."))
        pointPresent = false;

    if (pointPresent) return;

    pointPresent = true;
    displayValue += ".";
    updateDisplay();
};

// Enter an operator sign
const appendOperator = function (value) {
    if (operationButtonPressed) return;
    
    if (value == "*") value = "x";

    if (secondNumEntered) {
        chaining = true;
        giveResult();
        secondNumEntered = false;
    }

    num1 = displayValue;
    operator = value;

    operationButtonPressed = true;
    displayValue += "  " + operator;
    updateDisplay();
};

// Remove one character from the display
const backspace = function () {
    displayValue = displayValue.toString();
    displayValue = displayValue.slice(0, displayValue.length - 1);
    
    updateDisplay();
};

// Perform the calculation
const giveResult = function () {
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

    if (chaining)
        upperValue = displayValue;
    else
        upperValue += " " + num2 + " = ";
    
    num1 = undefined;
    num2 = undefined;
    
    chaining = false;
    secondNumEntered = false;
    updateDisplay();
};

// You can clearly see what this function does!
const handleKeyboardInput = function (event) {
    if (event.key >= "0" && event.key <= "9")
        appendNumber(event.key);

    else if (event.key == ".")
        appendPointer();

    else if (event.key == "Backspace")
        backspace();

    else if (event.key == "Control")
        reset();

    else if (event.key == "+" || event.key == "-" || event.key == "*" || event.key == "/")
        appendOperator(event.key);
        
    else if (event.key == "Enter")
        giveResult();

    updateDisplay();
};


numButtons.forEach(btn => btn.addEventListener("click", event => appendNumber(event.target.textContent)));

operateButtons.forEach(btn => btn.addEventListener("click", event => appendOperator(event.target.textContent)));

equalButton.addEventListener("click", giveResult);

clearButton.addEventListener("click", reset);

pointButton.addEventListener("click", appendPointer);

backButton.addEventListener("click", backspace);

allButtons.forEach(btn => btn.addEventListener("click", event => { btn.blur() }));

window.addEventListener("keydown", handleKeyboardInput);