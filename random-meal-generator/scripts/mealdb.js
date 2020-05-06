class MealDB {
    constructor() {
        if(!MealDB.instance)
            MealDB.instance = this;
        this.domain = 'https://www.themealdb.com/';
        this.path = 'api/json/v1/1/random.php';
        return MealDB.instance;
    }

    async getRandomMeal() {
        const url = this.domain + this.path;
        fetch(url).then(response => response.json())
            .then(data => data.meals[0])
            .then(meal => {
                document.querySelector('.meal').style.display = 'block';
                fillMeal(meal);
            }).catch(err => showError(err));
    }
}

const mealdb = new MealDB();

function fillMeal(meal) {
    changeButton('Random Meal', false);
    document.querySelector('.spinner-border').hidden = false

    const mealName = meal.strMeal;
    const mealImage = meal.strMealThumb;
    const mealVideo = meal.strYoutube;
    const mealIngredients = extractIngredients(meal);
    const mealInstructions = extractInstructions(meal.strInstructions);
    
    const title = document.querySelector('.title');
    const image = document.querySelector('img');
    const ingredients = document.querySelector('.ingredients');
    const instructions = document.querySelector('.instructions');

    title.textContent = mealName;
    image.hidden = true;
    document.querySelector('.spinner-border').hidden = false;
    image.src = mealImage;
    ingredients.textContent = '';
    instructions.textContent = '';

    for(const mealIngredient of mealIngredients) {
        ingredients.appendChild(createElement('li', mealIngredient));
    }

    for(const mealInstruction of mealInstructions) {
        instructions.appendChild(createElement('p', mealInstruction))
    }
}

function createElement(el, text = null) {
    const element = document.createElement(el);
    if(text != null) {
        const textNode = document.createTextNode(text);
        element.appendChild(textNode);
    }
    return element;
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

function showError(err) {
    changeButton('Try Again', false);
    document.querySelector('.meal').style.display = 'none';
    document.querySelector('.alert').hidden = false;
}