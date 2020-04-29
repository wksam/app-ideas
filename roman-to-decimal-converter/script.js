document.querySelector('form').addEventListener('submit', convertNumber);

function convertNumber(e) {
    e.preventDefault();
    document.querySelector('#output').value = '';

    const formData = new FormData(e.target);
    const input = formData.get('input');

    if(input == '') { showInvalidInputField('Please fill out this field'); return; }

    let result = 0;
    if(!isNaN(input)) {
        const decimalNumber = parseInt(input);
        if(decimalNumber < 1) { showInvalidInputField('Value cannot be less than 1'); return; }
        if(decimalNumber > 3999) { showInvalidInputField('Value cannot be more than 3,999'); return; }
        console.log(decimalNumber);

        
    } else {
        const romanNumber = input.toUpperCase();
        const check = romanNumber.match(/[IVXLCDM]/g);
        document.querySelector('#input').value = romanNumber;

        if(check.length != romanNumber.length) {showInvalidInputField('It\'s not a roman number'); return; }

        const romanTable = { I: 1, IV: 4, V: 5, IX: 9, X: 10, XL: 40, L: 50, XC:90, C: 100, CD:400, D: 500, CM: 900, M: 1000 };
        let index = 0;
        let previousValue = '';
        while (index < romanNumber.length) {
            const currentValue = romanTable[romanNumber[index]];
            const nextValue = romanTable[romanNumber[index + 1]];

            if(previousValue != '' && currentValue > previousValue) { showInvalidInputField('Invalid roman number'); return; }
            if(index + 1 == romanNumber.length) { result += currentValue; break; }

            if(currentValue >= nextValue) {
                result += currentValue;
                previousValue = currentValue;
            } else {
                // Combination (IV, IX, XL, XC, CD, CM)
                const tempCurrentValue = romanTable[romanNumber[index] + romanNumber[index + 1]];
                if(tempCurrentValue == undefined) { showInvalidInputField('Invalid roman number'); return; }
                if(previousValue != '' && tempCurrentValue > previousValue) { showInvalidInputField('Invalid roman number'); return; }
                
                result += tempCurrentValue;
                previousValue = tempCurrentValue;
                index++;
            }
            index++;
        }
    }
    document.querySelector('#output').value = result;
    showValidInputField();
}

function showInvalidInputField(message) {
    document.querySelector('#input').classList.add('is-invalid');
    document.querySelector('.invalid-feedback').textContent = message;
}

function showValidInputField() {
    const input = document.querySelector('#input');
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}