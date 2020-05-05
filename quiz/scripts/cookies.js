function setCookie(cname, cvalue) {
    var maxage = "max-age="+ (6 * 60 * 60);
    document.cookie = cname + "=" + cvalue + ";" + maxage;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while(c.charAt(0) == ' ')
            c = c.substring(1);
        if(c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
    }
    return "";
}

function hasCookie(cname) {
    var token = getCookie(cname);
    return token != "";
}