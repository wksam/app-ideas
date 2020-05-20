$('form').submit(function(e) {
    e.preventDefault();
    disableSave();
    const inputValue = $(this).serializeArray().find(currentValue => currentValue.name == 'input').value;
    const type = $(this).serializeArray().find(currentValue => currentValue.name == 'type').value;
    if(inputValue == '') { showAlert("Text area is empty"); return; }

    if(type == 'json2csv') {
        try {
            const jsonValue = JSON.parse(inputValue);
            if(isNested(jsonValue)) { showAlert("Nested JSON structures are not supported."); return; }
            $('#output').text(convertToCSV(jsonValue));
            hideAlert();
            enableSave();
        } catch (error) {
            showAlert("It doesn't contain valid JSON");
        }
    } else {
        const csvValue = inputValue;
        convertToJSON(csvValue);
    }
});

function convertToJSON(text) {
    const arrayValues = extractValues(text);
}

function extractValues(sequence) {
    console.log(findNext(sequence));
}

function findNext(sequence, start=0) {
    const pos = sequence.search(/,/);
    const text = sequence.substring(start, pos);
    console.log(pos, text);
    if(text.search(/"/) != -1) {
        if(countChar % 2 != 0) { 
            console.log('ainda tem')
        } else {
            console.log('nao tem')
        }
    }
    return text;
}

function countChar(text, char) {
    let count = 0;
    for (const c of text) {
        if(c != char) continue;
        count++;
    }
    return count;
}