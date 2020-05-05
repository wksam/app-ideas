class OpenTriviaDatabase {
    constructor() {
        if(!OpenTriviaDatabase.instance)
            OpenTriviaDatabase.instance = this;

        this.domain = 'https://opentdb.com/';
        this.paths = {
            api: 'api.php',
            token: 'api_token.php',
            category: 'api_category.php'
        }

        return OpenTriviaDatabase.instance;
    }

    async getCategories() {
        const url = this.domain + this.paths.category;
        fetch(url).then(response => response.json())
            .then(function(data) {
                $('.alert').hide();
                fetchCategories(data);
            }).catch(function(err) {
                fetchFail(err);
            });
    }

    async getToken() {
        const parameters = '?command=request';
        const url = this.domain + this.paths.token + parameters;
        fetch(url).then(response => response.json())
            .then(function(data) {
                $('.alert').hide();
                setCookie('token', data.token);
                this.getCategories();
            }).catch(function(err) {
                fetchFail(err);
            });
    }

    async getQuestions(amount, category, difficulty, type) {
        const parameters = '?amount=' + amount + '&category=' + category + '&difficulty=' + difficulty + '&type=' + type;
        const url = this.domain + this.paths.api + parameters;
        fetch(url).then(response => response.json())
            .then(data => data.results)
            .then(function(questions) {
                $('.alert').hide();
                $('.config').hide();
                $('.results').remove();

                const quiz = new Quiz();
                quiz.current = 0;
                quiz.start = Date.now();
                quiz.questions = questions;

                nextQuestion();
            }).catch(function(err) {
                fetchFail(err);
            });
    }
}

function fetchCategories(data) {
    const categories = data.trivia_categories;
    let option = '<option value="">Any Category</option>';
    for (const category of categories) {
        option += '<option value="' + category.id + '">' + category.name + '</option>'
    }
    $('#category').empty().append(option);
}

function fetchFail(err) {
    $('.alert').show();

    $('button[type=submit]').prop('disabled', true);
    changeButtonToReady($('button[type=submit]'), 'Start', true);
    
    changeButtonToReady($('.retry'), 'Retry', false);
}

const api = new OpenTriviaDatabase();