clearAll();

// Test Functions

function isNumeric(c) {
    return !isNaN(parseInt(c))
}

function isMaxInputSize(s) {
    const sequence = s.split(".");
    return sequence.length == 1 ? sequence[0].split("").length >= 8 : sequence[1].split("").length >= 3;
}

function hasResultErr(s) {
    const sequence = s.split(".");
    return sequence[0].split("").length > 8;
}

function isOperation(e) {
    return e.data("operation") != undefined;
}

function isFunction(e) {
    return e.data("func") != undefined;
}

function isNumber(e) {
    return e.data("number") != undefined;
}

function removeLastCharDotIfExist(s) {
    return s.charAt(s.length - 1) != "." ? s : s.substring(0, s.length - 1);
}

function divisionByZero(lastNumber) {
    return operation == "division" && lastNumber == 0;
}



// Calculator Functions

function calculation(n1, n2, operation) {
    return operation(n1, n2);
}

function addition(n1, n2) {
    return parseFloat(n1) + parseFloat(n2);
}

function subtraction(n1, n2) {
    return parseFloat(n1) - parseFloat(n2);
}

function division(n1, n2) {
    return parseFloat(n1) / parseFloat(n2)  ;
}



let lastType = "number";
let operation;
$(".button").click(function(e) {
    const input = e.target.innerHTML;
    const display = $(".display");
    const sDisplay = $(".s-display");

    if(display.text() == "ERR") clearAll();
    if(isNumber($(this))) {
        if(lastType != "number") clearEntry();
        if(!isMaxInputSize(display.text())) {
            const number = $(this).data("number");
            const newValue = display.text() == "0" ? number : display.text() + number;
            display.text(newValue);
            lastType = "number";
        }
    } else if(isOperation($(this))) {
        const displayValue = removeLastCharDotIfExist(display.text());
        if(sDisplay.text() == "" || lastType == "operation" || operation == "result") {
            const newValue = displayValue + " " + input;
            display.text(displayValue);
            sDisplay.text(newValue);
        } else {
            if(divisionByZero(displayValue)) {
                clearAll();
                display.text("ERR");
                return;
            }
            const firstNumber = sDisplay.text().split(" ")[0];
            const result = calculation(firstNumber, displayValue, callFunctionByName(operation));
            if(hasResultErr(result.toString())) {
                clearAll();
                display.text("ERR");
                return;
            }
            display.text(result);
            if($(this).data("operation") == "result") {
                sDisplay.text("");
                operation = "";
            } else {
                const newValue = result + " " + input;
                sDisplay.text(newValue);
            }
        }
        operation = $(this).data("operation");
        lastType = "operation";
    } else if(isFunction($(this))) {
        callFunction(callFunctionByName(getFunctionName($(this))));
    }
})

function callFunctionByName(functionName) {
    return window[functionName];
}

function getFunctionName(obj) {
    return obj.data("func");
}

function callFunction(func) {
    return func();
}



// Key calculator functions

function clearAll() {
    clearEntry();
    $(".s-display").text("");
}

function clearEntry() {
    $(".display").text("0");
}

function changeSign() {
    const display = $(".display");
    const firstChar = display.text().charAt(0);
    if (isNumeric(firstChar)) {
        if (firstChar != "0") {
            const newValue = "-" + display.text();
            display.text(newValue);
        }
    } else {
        display.text(display.text().substring(1));
    }
}

function decimalPoint() {
    const displayValue = $(".display").text();
    const newValue = displayValue.includes(".") ? displayValue : displayValue + ".";
    $(".display").text(newValue);
}