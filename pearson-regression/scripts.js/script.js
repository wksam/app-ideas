document.querySelector('form').addEventListener('submit', submit);

let values = [];

function submit(e) {
    e.preventDefault();

    if(e.submitter.name == 'add') {
        const formData = new FormData(e.target);
        const xValue = formData.get('x');
        const yValue = formData.get('y');

        if(xValue == '' || yValue == '') {
            alert('Invalid values. Try again.'); return;
        }
        
        const value = { 'x': xValue, 'y': yValue };
        values.push(value);

        addRow(values);

        if(values.length > 2)
            document.querySelector('button[name=calculate]').disabled = false;
    } else {

    }
}

function addRow(values) {
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