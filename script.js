$('form').submit(function(e) {
    console.log($(this).serializeArray());
    e.preventDefault();
});
