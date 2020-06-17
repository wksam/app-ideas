document.querySelector('form').addEventListener('submit', onGenerate);
function onGenerate(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const columns = parseInt(formData.get('columns'));
    const rows = parseInt(formData.get('rows'));
    const table = createTable(columns, rows);

    const tableContainer = document.querySelector('.table-responsive');
    tableContainer.textContent = '';
    tableContainer.append(table);

    const markdownContainer = document.querySelector('#markdown');
    markdownContainer.hidden = false;
    markdownContainer.textContent = createMarkdownTable(columns, rows);
}

function createTable(columns, rows) {
    const table = document.createElement('table');
    table.setAttribute('class', 'table table-bordered');
    
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    table.append(thead);
    table.append(tbody);

    for (let row = 1; row <= rows; row++) {
        const tr = document.createElement('tr');
        for(let column = 1; column <= columns; column++) {
            const input = document.createElement('input');
            input.placeholder = row + ' : ' + column;
            input.addEventListener('input', onChangeInputTable);
            if(row === 1) {
                const th = document.createElement('th');
                th.setAttribute('scope', 'col');
                input.placeholder += ' Header';
                th.append(input);
                tr.append(th);
            } else {
                const td = document.createElement('td');
                input.placeholder += ' Data';
                td.append(input);
                tr.append(td);
            }
        }
        if(row === 0) thead.append(tr);
        else tbody.append(tr);
    }
    return table;
}

function createMarkdownTable(columns, rows) {
    let markdown = '';
    for (let row = 0; row < rows + 1; row++) {
        markdown += '|';
        for (let column = 0; column < columns; column++) {
            markdown += row !== 1 ? '     |' : ' --- |';
        }
        if(row != rows) markdown += '\n';
    }
    return markdown;
}

function onChangeInputTable(e) {
    const markdown = document.querySelector('#markdown');
    const text = ' ' + e.target.value + ' ';
    
    let row = parseInt(e.target.placeholder.split(' ')[0]);
    row = row !== 1 ? row : row - 1;
    let column = parseInt(e.target.placeholder.split(' ')[2]);
    
    let rowsMarkdown = markdown.value.split('\n');
    let columnMarkdown = rowsMarkdown[row].split('|');
    columnMarkdown[column] = text;

    rowsMarkdown[row] = columnMarkdown.join('|');
    markdown.value = rowsMarkdown.join('\n');
}