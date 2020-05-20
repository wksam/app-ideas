function fillCategory(categories) {
    fillDropdown($('.category'), categories);
    $('.category>a.dropdown-item').bind('click', function() {
        api.fetchFilterByCategory($(this).text());
    });
}

function fillArea(areas) {
    fillDropdown($('.area'), areas);
    $('.area>a.dropdown-item').bind('click', function() {
        api.fetchFilterByArea($(this).text());
    });
}

function fillDropdown(dropdown, data) {
    let a = '';
    for (const d of data) {
        a += '<a class="dropdown-item" href="#">' + d + '</a>';
    }
    dropdown.append(a);
}

function showCards(meals, title) {
    $('.container').empty();
    
    if(meals == null) {
        title = '<h1 class="text-center my-4">No results found</h1>';
        $('.container').append(title);
        return;
    }

    let cards = '<h1 class="text-center my-4">' + title + '</h1>' + 
        '<div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">';

    for (const meal of meals) {
        const card = 
            '<div class="col p-3">' +
                '<div class="card" data-id="' + meal.idMeal + '" style="cursor: pointer;">' +
                    '<img src="' + meal.strMealThumb + '" alt="Recipe Image" class="card-img-top">' +
                    '<div class="card-body">' +
                        '<h5 class="card-title">' + meal.strMeal + '</h5>' +
                    '</div>' +
                '</div>' +
            '</div>';
        cards += card;
    }
    
    cards += '</div>';
    $('.container').append(cards);
    $('.card').bind('click', function() {
        const id = $(this).data('id');
        $('.container').empty();
        api.fetchSearchById(id);
    });
}

function showRecipe(meal) {
    $('.container').empty();

    const mealIngredients = extractIngredients(meal);
    const mealInstructions = extractInstructions(meal.strInstructions);
    
    const title = '<h1 class="text-center my-4">' + meal.strMeal + '</h1>';

    let container = '<div class="d-flex flex-row mb-3">';
    const image = 
        '<div class="image img-thumbnail align-self-start d-none d-lg-block d-md-block">' +
            '<img src="' + meal.strMealThumb + '" alt="Recipe Image" width="400">' +
        '</div>';
    container += image;
    
    let listContainer = '<div class="ml-sm-4">';
    listContainer += '<p class="m-0">Category: ' + meal.strCategory + '</p>';
    listContainer += '<p>Area: ' + meal.strArea + '</p>';

    let ingredients = '<ul>';
    for (const mealIngredient of mealIngredients) {
        ingredients += '<li>' + mealIngredient + '</li>';
    }
    ingredients += '</ul>'
    listContainer += ingredients;
    listContainer += '</div>';
    container += listContainer;
    container += '</div>';

    let instructions = '';
    for (const mealInstruction of mealInstructions) {
        instructions += '<p>' + mealInstruction + '</p>';
    }

    $('.container').append(title);
    $('.container').append(container);
    $('.container').append(instructions);
}

function extractIngredients(meal) {
    const ingredients = [];
    for(const key in meal) {
        if(key.includes('strIngredient') && !(meal[key] == undefined || meal[key] == '')) {
            const index = key.replace('strIngredient', '')
            const ingredient = meal['strMeasure' + index].trim() + ' ' + meal[key].trim();
            ingredients.push(ingredient);
        }
    }
    return ingredients;
}

function extractInstructions(instructions) {
    return instructions.split('\n');
}

function showError(message) {
    ready();
    $('.container').html('<h1 class="text-center my-4">' + message + '</h1>');
}

function loading() {
    const button = $('button[type=submit]');
    button.prop('disabled', true);
    button.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...');

    $('.container').html('<h3 class="text-center my-4"><span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span> Loading...</h3>');
}

function ready() {
    const button = $('button[type=submit]');
    button.prop('disabled', false);
    button.text('Search');

    $('.container').html('<h3 class="text-center my-4">Recipe</h3>');
}