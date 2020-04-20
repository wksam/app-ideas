let submitValues;

$("form").submit(function(event) {
    submitValues = $(this).serializeArray();

    const type = getValueByName("color");

    let color;
    if(type == "rgb") {
        const red = getValueByName("red");
        const green = getValueByName("green");
        const blue = getValueByName("blue");
        color = "#" + red + green + blue;
    } else {
        const hue = getValueByName("hue");
        const saturation = getValueByName("saturation");
        const lightness = getValueByName("lightness");
        color = concatRBGorHSL("hsl", hue, saturation + "%", lightness + "%");
    }

    changeBackgroundColor($("body"), color);
    $(".play").prop("disabled", false);
    event.preventDefault();
});

function changeBackgroundColor(element, color) {
    element.css("background", color);
}

let intervalId;
function play() {
    disableForm();
    if(intervalId != null) clearInterval(intervalId);

    const interval = getValueByName("interval") * 1000;
    intervalId = setInterval(execFunction, interval);
}

function stop() {
    enableForm();
    clearInterval(intervalId);
}

function parseHexToDec(hex) {
    return parseInt(hex, 16);
}

function parseRGBtoHSL(red, green, blue) {
    red /= 255, green /= 255, blue /= 255;
  
    var max = Math.max(red, green, blue), min = Math.min(red, green, blue);
    var hue, saturation, lightness = (max + min) / 2;
  
    if (max == min) {
        hue = saturation = 0;
    } else {
        var d = max - min;
        saturation = lightness > 0.5 ? d / (2 - max - min) : d / (max + min);
  
        switch (max) {
            case red: hue = (green - blue) / d + (green < blue ? 6 : 0); break;
            case green: hue = (blue - red) / d + 2; break;
            case blue: hue = (red - green) / d + 4; break;
        }
  
        hue /= 6;
    }
    return [ hue, saturation, lightness ];
}

function incrementCap(n1, n2, cap) {
    return (n1 + n2) % cap;
}

function execFunction() {
    const type = getValueByName("color");
    const backgroundColor = $("body").css("background-color");
    const rgb = backgroundColor.match(/\d+/g).map(Number);

    let newColor;
    if(type == "rgb") {
        const addRed = parseHexToDec(getValueByName("add-red"));
        const addGreen = parseHexToDec(getValueByName("add-green"));
        const addBlue = parseHexToDec(getValueByName("add-blue"));

        const newRed = incrementCap(rgb[0], addRed, 256);
        const newGreen = incrementCap(rgb[1], addGreen, 256);
        const newBlue = incrementCap(rgb[2], addBlue, 256);
        newColor = concatRBGorHSL("rgb", newRed, newGreen, newBlue);
    } else {
        const addHue = parseInt(getValueByName("add-hue"));
        const addSaturation = parseInt(getValueByName("add-saturation"));
        const addLightness = parseInt(getValueByName("add-lightness"));

        const hsl = parseRGBtoHSL(rgb[0], rgb[1], rgb[2]);
        const newHue = Math.round(incrementCap((hsl[0] * 359), addHue, 360));
        const newSaturation = Math.round(incrementCap((hsl[1] * 100), addSaturation, 101));
        const newLightness = Math.round(incrementCap((hsl[2] * 100), addLightness, 101));
        newColor = concatRBGorHSL("hsl", newHue, newSaturation + "%", newLightness + "%");
    }
    changeBackgroundColor($("body"), newColor);
}

function disableForm() {
    $(".form-control").prop("disabled", true);
    $(".submit").prop("disabled", true);
    $(".play").prop("disabled", true);
    $(".stop").prop("disabled", false);
}

function enableForm() {
    $(".form-control").prop("disabled", false);
    $(".submit").prop("disabled", false);
    $(".play").prop("disabled", false);
    $(".stop").prop("disabled", true);
}

function getValueByName(name) {
    return submitValues.find(obj => obj.name == name).value;
}

$("input:radio").change(function() {
    switch (this.value) {
        case "rgb":
            $(".rgb").prop("hidden", false);
            $(".hsl").prop("hidden", true);
            break;
        case "hsl":
            $(".rgb").prop("hidden", true);
            $(".hsl").prop("hidden", false);
            break;
        default:
            break;
    }
});

function concatRBGorHSL(type, n1, n2, n3) {
    return type + "(" + n1 + ", " + n2 + ", " + n3 + ")";
}