const cardHTML = 
    '<div class="card mb-2">' +
        '<div class="card-body">' +
            'contentText' +
        '</div>' +
        '<div class="card-footer d-flex justify-content-between align-items-center">' +
            '<small class="text-muted">contentDate</small>' +
            '<div>' +
                '<button class="edit btn btn-primary mr-2">' +
                    '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
                        '<path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z"/>' +
                        '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" clip-rule="evenodd"/>' +
                    '</svg>' +
                '</button>' +
                '<button class="delete btn btn-danger">' +
                    '<svg class="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
                        '<path fill-rule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd"/>' +
                    '</svg>' +
                '</button>' +
            '</div>' +
        '</div>' +
    '</div>';

loadCards();

$('form').submit(function(e) {
    e.preventDefault();

    const input = $(this).serializeArray();
    const text = markdown(input[0].value);
    const date = new Date();

    if(cardToUpdate != null) {
        cardToUpdate.find('.card-body').html(text);
        cardToUpdate.find('.text-muted').html('Updated ' + formattedDate(date));

        const pos = ($('.card').length - $('.card').index(cardToUpdate)) - 1;
        updateLocalStorage(pos, text, 'Updated ' + formattedDate(date));

        $('button[type=submit]').text('Create');
        $('button.edit').prop('disabled', false);
        $('button.delete').prop('disabled', false);
        cardToUpdate = null;
    } else {
        $('.cards').prepend(cardHTML.replace('contentText', text).replace('contentDate', 'Created ' + formattedDate(date)));
        addLocalStorage(text, 'Created ' + formattedDate(date));
    }

    $('textarea').val('');
})

let cardToUpdate = null;
$('body').on('click', '.edit', function() {
    cardToUpdate = $(this).parents('.card');
    const text = cardToUpdate.find('.card-body').html();
    const date = cardToUpdate.find('.text-muted').html();

    $('textarea').val(text);

    $('button[type=submit]').text('Update');
    $('button.edit').prop('disabled', true);
    $('button.delete').prop('disabled', true);
})

$('body').on('click', '.delete', function() {
    const card = $(this).parents('.card');

    const pos = ($('.card').length - $('.card').index(card)) - 1;
    deleteLocalStorage(pos);

    card.remove();
})

function formattedDate(date){
    let day  = date.getDate().toString();
    day = (day.length == 1) ? '0' + day : day;
    
    let month = (date.getMonth() + 1).toString();
    month = (month.length == 1) ? '0' + month : month;

    let year = date.getFullYear();
    return day + "/" + month + "/" + year;
}

function addLocalStorage(text, date) {
    const data = { 'content': text, 'date': date };
    const localStorageData = localStorage.getItem('cards');
    if(localStorageData != null) {
        const arrayData = JSON.parse(localStorageData);
        arrayData.push(data);
        localStorage.setItem('cards', JSON.stringify(arrayData));
    } else {
        const arrayData = [data];
        localStorage.setItem('cards', JSON.stringify(arrayData));
    }
}

function updateLocalStorage(pos, text, date) {
    const data = { 'content': text, 'date': date };
    const localStorageData = localStorage.getItem('cards');

    if(localStorageData != null) {
        const arrayData = JSON.parse(localStorageData);
        arrayData[pos] = data;
        localStorage.setItem('cards', JSON.stringify(arrayData));
    } else {
        console.log('No data');
    }
}

function deleteLocalStorage(pos) {
    const localStorageData = localStorage.getItem('cards');

    if(localStorageData != null) {
        const arrayData = JSON.parse(localStorageData);
        arrayData.splice(pos, 1);
        localStorage.setItem('cards', JSON.stringify(arrayData));
    } else {
        console.log('No data');
    }
}

function loadCards() {
    const localStorageData = localStorage.getItem('cards');

    if(localStorageData != null) {
        const arrayData = JSON.parse(localStorageData);
        const cardContainer = $('.cards');
        for (const data of arrayData) {
            cardContainer.prepend(cardHTML.replace('contentText', data.content).replace('contentDate', data.date));
        }
    } else {
        console.log('No data');
    }
}