document.querySelector('#input').addEventListener('input', onInput);

function onInput(e) {
    e.target.value = e.target.value.substring(0, 2048);
    document.querySelector('.count').textContent = this.value.length;
}

document.querySelector('form').addEventListener('submit', translate);

function translate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const words = formData.get('input').trim().split(/\s+/);
    const frequency = {};
    for (const word of words) {
        frequency[word] = frequency[word] === undefined ? 1 : frequency[word] + 1;
    }

    const sorted = sortByValue(frequency);
    const tbody = document.querySelector('tbody');
    tbody.textContent = '';
    for (let index = 0; index < sorted.length; index++) {
        const tr = createElement('tr');
        const thRow = createElement('th', index, 'scope', 'row');
        const tdWord = createElement('td', sorted[index][1]);
        const tdFreq = createElement('td', sorted[index][0]);

        tr.appendChild(thRow);
        tr.appendChild(tdWord);
        tr.appendChild(tdFreq);

        tbody.appendChild(tr);
    }
}

function sortByValue(obj) {
    const sortedArray = [];
    for (const key in obj) {
        const element = obj[key];
        sortedArray.push([obj[key], key]);
    }
    return sortedArray.sort().reverse();
}

function createElement(elemType, value, attrName, attrValue) {
    const elem = document.createElement(elemType)
    if(attrName !== undefined && attrValue !== undefined) elem.setAttribute(attrName, attrValue);
    if(value !== undefined) elem.appendChild(document.createTextNode(value));

    return elem;
}