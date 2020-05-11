init();
function init() {
    loading();
    api.fetchArea();
    api.fetchCategory();
}

$('form').submit(function(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    api.fetchSearch(formData.get('search'));

    e.target.reset();
});

window.addEventListener('popstate', function(e) {
    if(e.state != null) {
        if(e.state.func == 'showCards')
            showCards(e.state.data, e.state.title)
        else
            showRecipe(e.state.data);
    } else 
        $('.container').html('<h1 class="text-center my-4">Recipe</h1>')
});