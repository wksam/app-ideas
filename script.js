const inputs = document.querySelectorAll('input');

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keyup', function() {
        validation(this.id, this.value);
    });
}


function validation(name, text) {
    const element = document.getElementById(name);
    switch (name) {
        case 'email':
            if(validateRegExp(text, /^\w+([.-]?\w+)*@gmail\.com$/))
                element.classList.remove('invalid');
            else
                element.classList.add('invalid');
            break;
        case 'username':
            if(!validateRegExp(text, /\s/) && element.value != '')
                element.classList.remove('invalid');
            else
                element.classList.add('invalid');
            break;
        case 'password':
            if(validate(text)) 
                element.classList.remove('invalid');
            else
                element.classList.add('invalid');
            break;
        default:
            break;
    }
    console.log(hasInvalidOrEmpty());
    document.getElementsByTagName('button')[0].disabled = hasInvalidOrEmpty();
}

function validateRegExp(text, regexp) {
    return text.match(regexp);
}

function validate(text) {
    let upper = 0;
    let symbol = 0;
    let hyphen = 0;
    for(let i = 0; i < text.length; i++) {
        if(text[i].match(/[A-Z]/)) {
            upper++;
            if(upper > 5) return false;
        } else if(text[i].match(/[@#$%&]/)) {
            symbol++;
            if(symbol > 6) return false;
        } else if(text[i].match(/[-]/)) {
            hyphen++;
            if(hyphen > 2) return false;
        } else {
            return false;
        }
    }
    if(upper == 5 && symbol == 6 && hyphen == 2) return true;
    else return false;
}

function hasInvalidOrEmpty() {
    for(let input of inputs) {
        if(input.classList.contains('invalid'))
            return true;
        if(input.value == '')
            return true;
    }
    return false;
}
