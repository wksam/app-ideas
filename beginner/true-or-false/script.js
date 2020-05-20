document.querySelectorAll('.type>select').forEach(function(elem) {
    elem.addEventListener('change', typeOnChange);
});

function typeOnChange(e) {
    const className = '.' + e.target.id.split('-')[0] + '-var';
    const field = document.querySelector(className);
    const fieldSelect = document.querySelector('select' + className);

    field.value = ''
    field.hidden = false;
    field.required = true;
    fieldSelect.hidden = true;

    if(e.target.value == 'null' || e.target.value == 'undefined') {
        field.disabled = true;
    } else {
        field.disabled = false;
        if(e.target.value == 'number') {
            field.type = 'number'
        } else if(e.target.value == 'boolean') {
            field.hidden = true;
            field.required = false;
            fieldSelect.hidden = false;
        } else {
            field.type = 'text';
        }
    }
}

document.querySelector('form').addEventListener('submit', compare);
const comparisons = {
    '==':  (a, b) => a == b,
    '===': (a, b) => a === b,
    '!=':  (a, b) => a != b,
    '!==': (a, b) => a !== b,
    '>':   (a, b) => a > b,
    '<':   (a, b) => a < b,
    '>=':  (a, b) => a >= b,
    '<=':  (a, b) => a <= b
}

function compare(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const variable1 = convert(formData.get('first-var'), formData.get('first-type'));
    const variable2 = convert(formData.get('second-var'), formData.get('second-type'));
    const comparison = formData.get('comparison');
    const result = comparisons[comparison](variable1, variable2);
    
    const alert = document.querySelector('.alert');
    alert.hidden = false;
    alert.textContent = result;
}

function convert(variable, type) {
    switch (type) {
        case 'number':
            return parseInt(variable);
        case 'boolean':
            return variable === 'true';
        case 'null':
            return null;
        case 'undefined':
            return undefined;
        default:
            return variable;
    }
}
