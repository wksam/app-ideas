document.querySelector('form').addEventListener('submit', convertNumber);

function convertNumber(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const input = formData.get('input');

    if(input == '') { console.log('empty'); return; }

    if(!isNaN(input)) {
        const decimalNumber = parseInt(input);
        if(decimalNumber < 1) { console.log('zero or negative'); return; }
        if(decimalNumber > 3999) { console.log('max decimal number'); return; }
        console.log(decimalNumber);

    } else {
        const romanNumber = input.toUpperCase();
        const check = romanNumber.match(/[IVXLCDM]/g);

        if(check.length != romanNumber.length) { console.log('It\'s not a roman number'); return; }
        console.log(romanNumber);
    }
}