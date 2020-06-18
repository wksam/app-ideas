document.querySelector('form').addEventListener('submit', onGenerate);
function onGenerate(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const columns = parseInt(formData.get('columns'));
    const rows = parseInt(formData.get('rows'));

    const tableContainer = document.querySelector('.input-table');
    tableContainer.textContent = '';
    tableContainer.append(createTable(columns, rows, false));

    document.querySelector('.result').hidden = false;
    document.querySelector('#markdown').textContent = createMarkdownTable(columns, rows);

    const previewer = document.querySelector('.preview');
    previewer.textContent = '';
    previewer.append(createTable(columns, rows, true));
}

function createTable(columns, rows, isPreviewer) {
    const table = document.createElement('table');
    table.setAttribute('class', 'table table-bordered');
    
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    table.append(thead);
    table.append(tbody);

    if(!isPreviewer) {
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
    } else {
        for (let row = 0; row < rows; row++) {
            const tr = document.createElement('tr');
            for(let column = 0; column < columns; column++) {
                if(row === 0) {
                    const th = document.createElement('th');
                    th.setAttribute('scope', 'col');
                    th.setAttribute('class', 'cell-' + row + '-' + column);
                    tr.append(th);
                } else {
                    const td = document.createElement('td');
                    td.setAttribute('class', 'cell-' + row + '-' + column);
                    tr.append(td);
                }
            }
            if(row === 0) thead.append(tr);
            else tbody.append(tr);
        }
    }
    return table;
}

function createMarkdownTable(columns, rows) {
    let markdown = '';
    for (let row = 0; row < rows + 1; row++) {
        markdown += '|';
        for (let column = 0; column < columns; column++) {
            markdown += row !== 1 ? '   |' : '---|';
        }
        if(row != rows) markdown += '\n';
    }
    return markdown;
}

function onChangeInputTable(e) {
    const value = e.target.value;
    let row = parseInt(e.target.placeholder.split(' ')[0]);
    row = row !== 1 ? row : row - 1;
    let column = parseInt(e.target.placeholder.split(' ')[2]);

    changeMarkdown(value, row, column);

    row = parseInt(e.target.placeholder.split(' ')[0]) - 1;
    column = parseInt(e.target.placeholder.split(' ')[2]) - 1;

    changePreviewer(value, row, column);
}

function changeMarkdown(value, row, column) {
    const markdown = document.querySelector('#markdown');

    const rowsMarkdown = markdown.value.split('\n');
    const maxLength = getMaxLength(rowsMarkdown, column, value);

    for (const index in rowsMarkdown) {
        let columnMarkdown = rowsMarkdown[index].split('|');
        if(index == 1) {
            columnMarkdown[column] = '-'.repeat(maxLength);
        } else if(row == index) {
            columnMarkdown[column] = ' ' + value + ' '.repeat(maxLength - value.length - 1);
        } else {
            columnMarkdown[column] = ' ' + columnMarkdown[column].trim() + ' '.repeat(maxLength - columnMarkdown[column].trim().length - 1);
        }
        rowsMarkdown[index] = columnMarkdown.join('|');
    }
    markdown.value = rowsMarkdown.join('\n');
}

function getMaxLength(rowsMarkdown, column, value) {
    let copyRowsMarkdown = [...rowsMarkdown];
    copyRowsMarkdown.splice(1, 1);
    let maxLength = copyRowsMarkdown.map(item => item.split('|')[column].trim().length).reduce((result, current) => result > current ? result : current);
    maxLength = maxLength > value.length ? maxLength : value.length;
    return maxLength + 2 < 3 ? 3 : maxLength + 2;
}

function changePreviewer(value, row, column) {
    document.querySelector('.cell-' + row + '-' + column).textContent = value;
}

document.querySelector('.clipboard').addEventListener('click', copyToClipboard);
function copyToClipboard() {
    const textarea = document.querySelector('#markdown');
    textarea.disabled = false;
    textarea.select();
    document.execCommand('copy');
    textarea.disabled = true;
}