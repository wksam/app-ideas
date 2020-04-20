// Check for the various File API support.
if(window.File && window.FileReader && window.FileList && window.Blob) {
    // All the file APIs are supported.
} else {
    showAlert('The File APIs are not fully supported in this browser');
    $('#file').prop('disabled', true);
}

let reader;
$('#file').change(function(e) {
    const files = e.target.files;
    if(files.length == 0) return;

    const file = files[0];
    if(file.type != 'application/json') { showAlert('File not supported.'); return; }

    hideAlert();

    reader = new FileReader();
    reader.onerror = errorHandler;
    reader.onload = function(e) {
        updateInputTextArea(e.target.result);
    };
    reader.readAsText(file);
});

function errorHandler(e) {
    switch (e.target.error.code) {
        case e.target.error.NOT_FOUND_ERR:
            showAlert('File not found.');
            break;
        case e.target.error.NOT_READABLE_ERR:
            showAlert('File is not readable.');
            break;
        case e.target.error.ABORT_ERR:
            break;
        default:
            showAlert('An error occureed reading this file.');
    }
}

function updateInputTextArea(text) {
    $('#input').text(text);
}

$('#save').click(function(e) {
    const csv = $('#output').text();
    download('result.csv', csv);
});

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}