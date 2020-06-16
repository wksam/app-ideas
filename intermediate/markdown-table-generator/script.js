document.querySelector('form').addEventListener('submit', onGenerate);
function onGenerate(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const table = createTable(formData.get('width'), formData.get('height'));
    document.querySelector('.table-responsive').append(table);
}

function createTable(width, height) {
    const table = document.createElement('table');
    table.setAttribute('class', 'table table-bordered');
    
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    table.append(thead);
    table.append(tbody);

    for (let row = 0; row < height; row++) {
        const tr = document.createElement('tr');
        for(let cell = 0; cell < width; cell++) {
            if(row === 0) {
                const th = document.createElement('th');
                th.setAttribute('scope', 'col');
                th.textContent = row + ':' + cell;
                tr.append(th);
            } else {
                const td = document.createElement('td');
                td.textContent = row + ':' + cell;
                tr.append(td);
            }
        }
        if(row === 0) thead.append(tr);
        else tbody.append(tr);
    }
    return table;
}