document.querySelector('form').addEventListener('submit', submit);

let sample = [];
// let sample = [
//     { x:110, y: 44, r: 10 },
//     { x:116, y: 31, r: 10 },
//     { x:124, y: 43, r: 10 },
//     { x:129, y: 45, r: 10 },
//     { x:131, y: 56, r: 10 },
//     { x:138, y: 79, r: 10 },
//     { x:142, y: 57, r: 10 },
//     { x:150, y: 56, r: 10 },
//     { x:153, y: 58, r: 10 },
//     { x:155, y: 92, r: 10 },
//     { x:156, y: 78, r: 10 },
//     { x:159, y: 64, r: 10 },
//     { x:164, y: 88, r: 10 },
//     { x:168, y: 112, r: 10 },
//     { x:174, y: 101, r: 10 }
// ]

function submit(e) {
    e.preventDefault();

    if(e.submitter.name == 'add') {
        const formData = new FormData(e.target);
        const xValue = formData.get('x');
        const yValue = formData.get('y');

        if(xValue == '' || yValue == '') {
            alert('Invalid values. Try again.'); return;
        }
        
        const value = { x: parseInt(xValue), y: parseInt(yValue), r: 10 };
        sample.push(value);

        addRowSample(sample);
        resetInput();
        
        if(sample.length > 2)
            document.querySelector('button[name=calculate]').disabled = false;
    } else {
        const results = calculatePearsonRegression(sample);
        const container = document.querySelector('.result')
        container.prepend(createTableResult(results));
        const chart = document.querySelector('#scatterplot');
        scatterplot(sample);
        chart.hidden = false;
    }
}

function addRowSample(values) {
    const tRow = document.createElement('tr');

    const tHeader = document.createElement('th');
    tHeader.setAttribute('scope', 'row');
    const tDataX = document.createElement('td');
    const tDataY = document.createElement('td');

    const textNodeScope = document.createTextNode(values.length);
    const textNodeX = document.createTextNode(values[values.length - 1].x);
    const textNodeY = document.createTextNode(values[values.length - 1].y);

    tHeader.appendChild(textNodeScope);
    tDataX.appendChild(textNodeX);
    tDataY.appendChild(textNodeY);

    tRow.appendChild(tHeader);
    tRow.appendChild(tDataX);
    tRow.appendChild(tDataY);
    
    document.querySelector('tbody').append(tRow);
}

function resetInput() {
    document.querySelectorAll('input').forEach(function(e) {
        e.value = '';
        if(e.name == 'x') e.focus();
    });
}

function createTableResult(result) {
    const div = createElement('div', [{ 'name': 'class', 'value': 'table-responsive' }]);
    const table = createElement('table', [{ 'name': 'class', 'value': 'table table-sm' }]);
    const tbody = createElement('tbody');
    
    const trPearson = createElement('tr');
    const thPearson = createElement('th', [{ 'name': 'scope', 'value': 'row' }]);
    const tdPearson = createElement('td', [{ 'name': 'colspan', 'value': '2' }]);
    const thTxtPearson = createTextNode('Pearson Correlation Coefficient');
    const tdTxtPearson = createTextNode(result.r);

    const trMean = createElement('tr');
    const thMean = createElement('th', [{ 'name': 'scope', 'value': 'row' }]);
    const tdMean1 = createElement('td');
    const tdMean2 = createElement('td');
    const thTxtMean = createTextNode('Arithmetic means');
    const tdTxtMean1 = createTextNode('x: ' + result.mean.x);
    const tdTxtMean2 = createTextNode('y: ' + result.mean.y);

    const trDeviation = createElement('tr');
    const thDeviation = createElement('th', [{ 'name': 'scope', 'value': 'row' }]);
    const tdDeviation1 = createElement('td');
    const tdDeviation2 = createElement('td');
    const thTxtDeviation = createTextNode('Standard deviations');
    const tdTxtDeviation1 = createTextNode('x: ' + result.deviation.x);
    const tdTxtDeviation2 = createTextNode('y: ' + result.deviation.y);

    div.appendChild(table)
    table.appendChild(tbody);

    tbody.appendChild(trPearson);
    tbody.appendChild(trMean);
    tbody.appendChild(trDeviation);

    trPearson.appendChild(thPearson);
    trPearson.appendChild(tdPearson);
    thPearson.appendChild(thTxtPearson);
    tdPearson.appendChild(tdTxtPearson);

    trMean.appendChild(thMean);
    trMean.appendChild(tdMean1);
    trMean.appendChild(tdMean2);
    thMean.appendChild(thTxtMean);
    tdMean1.appendChild(tdTxtMean1);
    tdMean2.appendChild(tdTxtMean2);

    trDeviation.appendChild(thDeviation);
    trDeviation.appendChild(tdDeviation1);
    trDeviation.appendChild(tdDeviation2);
    thDeviation.appendChild(thTxtDeviation);
    tdDeviation1.appendChild(tdTxtDeviation1);
    tdDeviation2.appendChild(tdTxtDeviation2);

    return div;
}

function createElement(name, attrs = null) {
    const element = document.createElement(name);
    if(attrs != null && attrs.length != 0) {
        for (const attr of attrs) {
            element.setAttribute(attr.name, attr.value);
        }
    }
    return element;
}

function createTextNode(text) {
    return document.createTextNode(text);
}