const root = document.documentElement;

$(".power").click(function() {
    toggleLight($(this));
    $(".collapse").collapse('hide');
});

function toggleLight(e) {
    const header = $("h1");
    if(e.hasClass("text-on")) {
        e.addClass("text-off");
        header.addClass("text-off");
        
        e.removeClass("text-on");
        header.removeClass("text-on");
        $(".bulb").each(function(index) {
            $(this).removeClass("twinkle-" + (index + 1));
        });

        $(".bulb").css("cursor", "default");
        isOn = false;
    } else {
        e.addClass("text-on");
        header.addClass("text-on");
        $(".bulb").each(function(index) {
            $(this).addClass("twinkle-" + (index + 1));
        });
        
        e.removeClass("text-off");
        header.removeClass("text-off");

        $(".bulb").css("cursor", "pointer");
        isOn = true;
    }
}

let bulbId = 1;
let isOn = true;
$(".bulb").click(function() {
    if(isOn) {
        bulbId = $(this).data("bulb-id");
        $(".collapse").collapse('show');

        const spreadValue = getComputedStyle(document.documentElement).getPropertyValue("--spread-" + bulbId).replace("px", "").replace(" ", "");
        output.innerHTML = spreadValue;
        slider.value = spreadValue;
    }
});

$(".color").click(function() {
    if(isOn) {
        root.style.setProperty("--twinkle-color-" + bulbId, $(this).css("background-color"));
        root.style.setProperty("--twinkle-dark-color-" + bulbId, darken($(this).css("background-color"), 0.5));
    }
});

function darken(color, amount=0.5) {
    const rgb = color.replace(/^(rgb|rgba)\(/,'').replace(/\)$/,'').replace(/\s/g,'').split(',');
    for (let i = 0; i < rgb.length; i++) {
        rgb[i] = Math.floor(rgb[i] * amount);
    }
    return "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
}

$(document).click(function(e) {
    if(!$(e.target).closest(".card, .bulb").length) {
        $(".collapse").collapse('hide');
    }
});

var slider = document.getElementById("intensity");
var output = document.getElementById("demo");

slider.oninput = function() {
    output.innerHTML = this.value;
    if(isOn) {
        root.style.setProperty("--spread-" + bulbId, this.value + "px");
        root.style.setProperty("--blur-" + bulbId, (this.value * 2) + "px");
    }
}