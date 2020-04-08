$("form").submit(function(e) {
    const input = $(this).serializeArray();
    console.log(input);

    $('form :input').val('');
    e.preventDefault();
});