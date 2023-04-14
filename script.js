const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

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
};

const calcDisplay = document.querySelector(".calc-display");
const numButtons = document.querySelectorAll(".digit");
let displayValue = "";

numButtons.forEach(btn => btn.addEventListener("click", event => {
    let num = event.target.textContent;
    displayValue += num;
    updateDisplay();
}));