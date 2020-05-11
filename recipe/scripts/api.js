class MealDB {
    constructor() {
        if(!MealDB.instance)
            MealDB.instance = this;
        this.domain = 'https://www.themealdb.com/';
        this.paths = {
            searchByName: 'api/json/v1/1/search.php?s=',
            searchByFirstLetter: 'api/json/v1/1/search.php?f=',
            searchById: 'api/json/v1/1/lookup.php?i=',
            category: 'api/json/v1/1/list.php?c=list',
            area: 'api/json/v1/1/list.php?a=list',
            filterByCategory: 'api/json/v1/1/filter.php?c=',
            filterByArea: 'api/json/v1/1/filter.php?a='
        }
        return MealDB.instance;
    }

    async fetchCategory() {
        const url = this.domain + this.paths.category;
        fetch(url).then(response => response.json())
            .then(data => data.meals.map(e => e.strCategory))
            .then(categories => {
                ready();
                fillCategory(categories);
            })
            .catch(err => showError('Something is wrong. Please try again later.'));
    }

    async fetchArea() {
        const url = this.domain + this.paths.area;
        fetch(url).then(response => response.json())
            .then(data => data.meals.map(e => e.strArea))
            .then(areas => {
                ready();
                fillArea(areas);
            })
            .catch(err => showError('Something is wrong. Please try again later.'));
    }

    async fetchSearch(search) {
        const url = this.getSearchByURL(search);
        fetch(url).then(response => response.json())
            .then(data => data.meals)
            .then(meals => {
                ready();
                history.pushState( { 'func': 'showCards', data: meals, title: search }, "", null);
                showCards(meals, search);
            })
            .catch(err => showError('Something is wrong. Please try again later.'));
    }

    async fetchSearchById(id) {
        const url = this.domain + this.paths.searchById + id;
        fetch(url).then(response => response.json())
            .then(data => data.meals[0])
            .then(meal => {
                ready();
                history.pushState( { 'func': 'showRecipe', data: meal }, "", null);
                showRecipe(meal)
            })
            .catch(err => showError('Something is wrong. Please try again later.'));
    }

    async fetchFilterByCategory(category) {
        const url = this.domain + this.paths.filterByCategory + category;
        fetch(url).then(response => response.json())
            .then(data => data.meals)
            .then(meals => {
                ready();
                history.pushState( { 'func': 'showCards', data: meals, title: category }, "", null);
                showCards(meals, category)
            })
            .catch(err => showError('Something is wrong. Please try again later.'));
    }

    async fetchFilterByArea(area) {
        const url = this.domain + this.paths.filterByArea + area;
        fetch(url).then(response => response.json())
            .then(data => data.meals)
            .then(meals => {
                ready();
                history.pushState( { 'func': 'showCards', data: meals, title: area }, "", null);
                showCards(meals, area)
            })
            .catch(err => showError('Something is wrong. Please try again later.'));
    }

    getSearchByURL(search) {
        if(!isNaN(search)) {
            return this.domain + this.paths.searchById + search;
        } else {
            if(search.length > 1) {
                return this.domain + this.paths.searchByName + search;
            } else {
                return this.domain + this.paths.searchByFirstLetter + search;
            }
        }
    }
}

const api = new MealDB();