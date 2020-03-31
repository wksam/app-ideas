const header = $("h1");
const bulbs  = [$(".bulb-1"), $(".bulb-2"), $(".bulb-3"), $(".bulb-4"), $(".bulb-5"), $(".bulb-6"), $(".bulb-7")];
const colors = ["bulb1", "bulb2", "bulb3", "bulb4", "bulb5", "bulb6", "bulb7"];

$(".power").click(function() {
    toggleLight($(this));
});

function toggleLight(e) {
    if(e.hasClass("text-on")) {
        e.addClass("text-off");
        header.addClass("text-off");
        $.each(bulbs, function(index, bulb) {
            bulb.addClass("off");
        });

        e.removeClass("text-on");
        header.removeClass("text-on");
        $.each(bulbs, function(index, bulb) {
            bulb.removeClass(colors[index]);
        });
    } else {
        e.addClass("text-on");
        header.addClass("text-on");
        $.each(bulbs, function(index, bulb) {
            bulb.addClass(colors[index]);
        });
        
        e.removeClass("text-off");
        header.removeClass("text-off");
        $.each(bulbs, function(index, bulb) {
            bulb.removeClass("off");
        });
    }
}
