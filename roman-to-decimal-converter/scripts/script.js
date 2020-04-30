document.querySelector('form').addEventListener('submit', convertNumber);

function convertNumber(e) {
    e.preventDefault();
    document.querySelector('#output').value = '';

    const formData = new FormData(e.target);
    const input = formData.get('input');

    try {
        if(input == '') throw new ValidationError('Please fill out this field');

        let result;
        if(!isNaN(input)) {
            const decimalNumber = parseInt(input);
            if(decimalNumber < 1) throw new ValidationError('Value cannot be less than 1');
            if(decimalNumber > 3999) throw new ValidationError('Value cannot be more than 3,999');
            
            result = convertToRoman(decimalNumber);
        } else {
            const romanNumber = input.toUpperCase();
            const check = romanNumber.match(/[IVXLCDM]/g);
            document.querySelector('#input').value = romanNumber;
            if(check.length != romanNumber.length) throw new ValidationError('It\'s not a roman number');

            result = convertToDecimal(romanNumber);
        }
        document.querySelector('#output').value = result;
        showValidFeedback();
    } catch (err) {
        if(err.name === 'ValidationError') {
            showInvalidFeedback(err.message);
        } else {
            console.log(err.name, err.message);
        }
    }
}

function showInvalidFeedback(message) {
    document.querySelector('#input').classList.add('is-invalid');
    document.querySelector('.invalid-feedback').textContent = message;
}

function showValidFeedback() {
    const input = document.querySelector('#input');
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}

function convertToDecimal(romanNumber) {
    const romanTable = { I: 1, IV: 4, V: 5, IX: 9, X: 10, XL: 40, L: 50, XC:90, C: 100, CD:400, D: 500, CM: 900, M: 1000 };
    let index = 0;
    let previousValue = '';
    let repetition = 0;
    let result = 0;

    while (index < romanNumber.length) {
        const currentValue = romanTable[romanNumber[index]];
        const nextValue = romanTable[romanNumber[index + 1]];

        if(previousValue != '' && currentValue > previousValue) throw new ValidationError('Invalid roman number');
        if(index + 1 == romanNumber.length) { result += currentValue; break; }

        if(currentValue >= nextValue) {
            repetition = currentValue == nextValue ? repetition + 1 : 0;
            if(repetition > 2) throw new ValidationError('Invalid roman number');

            result += currentValue;
            previousValue = currentValue;
        } else {
            const tempCurrentValue = romanTable[romanNumber[index] + romanNumber[index + 1]];
            if(tempCurrentValue == undefined) throw new ValidationError('Invalid roman number');
            if(previousValue != '' && tempCurrentValue > previousValue) throw new ValidationError('Invalid roman number');
            if(tempCurrentValue == previousValue) throw new ValidationError('Invalid roman number');
            
            result += tempCurrentValue;
            previousValue = tempCurrentValue;
            index++;
        }
        index++;
    }
    return result;
}

console.log(convertToRoman(2421));
function convertToRoman(decimalNumber) {
    const decimalTable = [{ 1000: 'M' }, { 900: 'CM' }, { 500: 'D' }, { 400: 'CD' }, { 100: 'C' }, { 90: 'XC' }, { 50: 'L' }, { 40: 'XL' }, { 10: 'X' }, { 9: 'IX' }, { 5: 'V' }, { 4: 'IV' }, { 1: 'I' }];
    let result = '';
    let remainder = decimalNumber;
    for (const object of decimalTable) {
        for (const key in object) {
            const quotient = Math.floor(remainder / key);
            remainder = remainder % key;
            for (let n = 0; n < quotient; n++) {
                result += object[key];
            }
        }
    }
    return result;
}