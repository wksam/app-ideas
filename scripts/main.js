// Top left
$('#tl-range').on('input', function() {
    $('.border-radius').css({ 'border-top-left-radius': $(this).val() + '%' });
});

// Top right
$('#tr-range').on('input', function() {
    $('.border-radius').css({ 'border-top-right-radius': $(this).val() + '%' });
});

// Bottom left
$('#bl-range').on('input', function() {
    $('.border-radius').css({ 'border-bottom-left-radius': $(this).val() + '%' });
});

// Bottom right
$('#br-range').on('input', function() {
    $('.border-radius').css({ 'border-bottom-right-radius': $(this).val() + '%' });
});