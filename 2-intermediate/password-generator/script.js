(function() {
    document.querySelector('form').addEventListener('submit', onSubmit);

    function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const upper = formData.get('uppercase') === 'on';
        const lower = formData.get('lowercase') === 'on';
        const number = formData.get('numbers') === 'on';
        const symbol = formData.get('symbols') === 'on';
        const length = parseInt(formData.get('length'));

        const password = generatePassword(upper, lower, number, symbol, length);
        document.querySelector('#password').value = password;
    }

    const randomFunction = {
        upper: generateUppercase,
        lower: generateLowercase,
        number: generateNumber,
        symbol: generateSymbol
    };

    function generatePassword(upper, lower, number, symbol, length) {
        let generatedPassword = '';
        const types = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]).map(item => Object.keys(item)[0]);
        if(types.length === 0 || length === 0) return generatedPassword;

        for (let i = 0; i < length; i++) {
            generatedPassword += randomFunction[types[randomNumber(0, types.length - 1)]]();
        }

        return generatedPassword;
    }

    function generateUppercase() {
        return String.fromCharCode(randomNumber(65, 90));
    }

    function generateLowercase() {
        return String.fromCharCode(randomNumber(97, 122));
    }

    function generateNumber() {
        return String.fromCharCode(randomNumber(48, 57));
    }

    function generateSymbol() {
        const symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~".split('');
        return symbols[randomNumber(0, symbols.length - 1)];
    }
    
    function randomNumber(min, max) {
        return parseInt(Math.round(Math.random() * (max - min) + min));
    }

    document.querySelector('#copy').addEventListener('click', onCopy);
    function onCopy() {
        const passwordField = document.querySelector('#password');
        passwordField.disabled = false;

        passwordField.select();
        document.execCommand('copy');

        passwordField.disabled = true;
    }
})();