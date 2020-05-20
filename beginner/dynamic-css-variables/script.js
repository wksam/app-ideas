const WHITE = "#fff", YELLOW = "#ffffe0", RED = "#ffcccb";
const USERID = "testuser", PASSWORD = "mypassword";
const USERCSSVAR = "--bg-color-user-id", PASSWORDCSSVAR = "--bg-color-password";

$("form").submit(function(e) {
    clearValidations();

    const submit = $(this).serializeArray();
    const userId = getData(submit, "userid");
    const password = getData(submit, "password");

    if(isEmptyOrSpace(userId) || isEmptyOrSpace(password)) {
        if(isEmptyOrSpace(userId)) {
            setCssVariable(USERCSSVAR, YELLOW);
            $(".warning-userid").attr("hidden", false);
        }
        if(isEmptyOrSpace(password)) {
            setCssVariable(PASSWORDCSSVAR, YELLOW);
            $(".warning-password").attr("hidden", false);
        }
        e.preventDefault();
        return;
    } else if(!isValidUser(userId) && !isValidPassword(password)) {
        console.log("heree");
        setCssVariable(USERCSSVAR, RED);
        setCssVariable(PASSWORDCSSVAR, RED);
        $(".invalid-login").attr("hidden", false);
        e.preventDefault();
        return;
    }
});

$(".cancel").click(function(e) {
    clearValidations();
});

function getData(array, name) {
    for(let i = 0; i < array.length; i++) {
        if(array[i].name == name) return array[i].value;
    }
}

function isEmptyOrSpace(value) {
    return value == "" || value.includes(" ");
}

function isValidUser(value) {
    return value == USERID;
}

function isValidPassword(value) {
    return value == PASSWORD;
}

function setCssVariable(name, color) {
    document.documentElement.style.setProperty(name, color);
}

function clearValidations() {
    setCssVariable(USERCSSVAR, WHITE);
    setCssVariable(PASSWORDCSSVAR, WHITE);
    $(".warning-userid").attr("hidden", true);
    $(".warning-password").attr("hidden", true);
    $(".invalid-login").attr("hidden", true);
}