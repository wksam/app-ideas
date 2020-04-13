getStatus();

$('button').click(function(e) {
    e.preventDefault();
    getStatus();
});

function addHTMLStatus(statusData) {
    statusData.each(function(index) {
        const name = $(this).find('.name').html();
        const status = $(this).find('.component-status').html();

        const rowHTML = 
            '<div class="p-2 d-flex justify-content-between ' + (index == 0 ? '' : 'border-top') + '">' +
                '<h4>' + name + '</h4>' +
                '<h4><span class="badge badge-success">' + status + '</span></h4>' +
            '</div>'
        $('.status').append(rowHTML);
    });
}

function getStatus() {
    changeButton(true);

    $.get('https://www.githubstatus.com/', function(data) {
        clearStatus();
        
        const start = data.indexOf('<body');
        const end = data.indexOf('</body>') + 7;
        const bodyData = $($.parseHTML(data.slice(start, end)));
        const statusData = bodyData.find('.showcased');
        
        if(statusData.length == 0) return;
        addHTMLStatus(statusData);
    }).done(function() {
        changeButton(false);
    }).fail(function() {
        alert("Something is wrong.")
    });
}

function clearStatus() {
    $('.status').html('');
}

function changeButton(loading) {
    const button = $('button');
    button.prop('disabled', loading);
    if(loading) {
        const loadingHTML = 
            '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>' +
            'Loading...';
        button.html(loadingHTML);
    } else {
        button.html('Get Status');
    }
}