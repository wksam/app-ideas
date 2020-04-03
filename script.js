$("form").submit(function(event) {
    const submitValues = $(this).serializeArray()
    console.log(submitValues);
    const red = submitValues[0].value;
    const green = submitValues[1].value;
    const blue = submitValues[2].value;
    const hexColor = "#" + red + green + blue;
    changeBackgroundColor($("body"), hexColor);

    event.preventDefault();
});

function changeBackgroundColor(element, hexColor) {
    element.css("background", hexColor);
}