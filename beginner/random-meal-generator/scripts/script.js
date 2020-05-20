document.querySelector('button').addEventListener('click', generateRandomMeal);
document.querySelector('img').addEventListener('load', imageLoaded);
document.querySelector('button').click();

function generateRandomMeal() {
    changeButton(' Loading...', true);
    document.querySelector('.alert').hidden = true;
    mealdb.getRandomMeal();
}

function imageLoaded(e) {
    e.target.hidden = false;
    document.querySelector('.spinner-border').hidden = true;
}

function changeButton(text, disabled) {
    const button = document.querySelector('button');
    const spinner = button.querySelector('.spinner-border');
    spinner.hidden = !disabled;
    button.disabled = disabled;
    button.textContent = text;
    button.prepend(spinner);
}

window.addEventListener('popstate', function(e) {
    if(e.state != null)
        fillMeal(e.state);
});