$('.logout').click((e) => {
    const username = $('form').data('username');
    changeLogoutMessage(username);
    disableLogin(false);
    disableInputs(false);
    clearInput();
    clearTable();
})

window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = $('.needs-validation');
    // Loop over them and prevent submission
    const validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                $('.alert').fadeOut();
                event.stopPropagation();
            } else {
                const inputs = $(this).serializeArray();
                const username = getInputValue(inputs, 'username');
                const ccode = getInputValue(inputs, 'ccode');
                
                $('form').data('username', username);
                getCoutryCode(username, ccode);
            }
            event.preventDefault();
            form.classList.add('was-validated');
        }, false);
    });
}, false);

function getInputValue(inputs, name) {
    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].name == name) return inputs[i].value;
    }
}

function getCoutryCode(username, ccode) {
    disableButtons(true);
    disableInputs(true);

    const url = 'http://ip-api.com/json/';
    jQuery.get(url, (data) => {
        getHello((ccode == '' ? data.countryCode : ccode), username);
        fillTable(data);
    }).fail(() => {
        disableButtons(false);
        disableInputs(false);
        alert('Something is wrong, try again. (1)');
    });
}

function getHello(countryCode, username) {
    disableButtons(true);
    disableInputs(true);

    const url = 'https://fourtonfish.com/hellosalut/?cc=' + countryCode;
    jQuery.get(url, (data) => {
        changeHelloMessage(data.hello, username);
    }).done(() => {
        clearInput();
        disableButtons(false);
    }).fail(() => {
        disableButtons(false);
        disableInputs(false);
        alert('Something is wrong, try again. (2)');
    });
}

function disableButtons(disable) {
    $('.login').prop('disabled', disable);
    if(disable) {
        const spin = 
            '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>' +
            ' Loading...'
        $('.login').html(spin);
    } else {
        disableLogin(true);
    }
}

function disableInputs(disable) {
    $('input').prop('disabled', disable);
}

function disableLogin(disable) {
    $('.login').html('Login').prop('disabled', disable);
    $('.logout').prop('disabled', !disable);
}

function changeHelloMessage(hello, username) {
    const message = hello + ' ' + username + ' you have successfully logged in!';
    $('.alert').html(message).fadeIn();
}

function changeLogoutMessage(username) {
    const message = 'Have a great day ' + username + '!';
    $('.alert').html(message).fadeIn();
}

function clearInput() {
    $('form').removeClass('was-validated');
    $('form :input').val('');
}

function fillTable(data) {
    addRowTable('IP Address', data.query);
    addRowTable('City', data.city);
    addRowTable('Region', data.regionName);
    addRowTable('Country', data.country);
    addRowTable('Zip Code', data.zip);
    addRowTable('Longitude', data.lon);
    addRowTable('Latitude', data.lat);
    addRowTable('Timezone', data.timezone);
}

function addRowTable(key, value) {
    const html = 
        '<tr>' +
            '<td>' + key + '</td>' +
            '<td>' + value + '</td>' +
        '</tr>'
    $('tbody').append(html);
}

function clearTable() {
    $('tbody').html('');
}