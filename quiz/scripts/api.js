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
            .then((data) => {
                $('.alert').hide();
                setCookie('token', data.token);
                this.getCategories();
            }).catch(function(err) {
                fetchFail(err);
            });
    }

    async resetToken(currentToken) {
        const parameters = '?command=reset&token=' + currentToken;
        const url = this.domain + this.paths.token + parameters;
        fetch(url).then(response => response.json())
            .then(function(data) {
                if(data.response_code != 0) throw data.response_code;
                setCookie('token', data.token);
                $('button[type=reset]').hide();
            }).catch(function(err) {
                fetchFail(err);
            });
    }

    async getQuestions(amount, category, difficulty, type) {
        const parameters = '?amount=' + amount + '&category=' + category + '&difficulty=' + difficulty + '&type=' + type;
        const url = this.domain + this.paths.api + parameters;
        fetch(url).then(response => response.json())
            .then(function(data) {
                if(data.response_code != 0) throw data.response_code;

                $('.alert').hide();
                $('.config').hide();
                $('.results').remove();

                quiz.current = 0;
                quiz.correct_answers = 0;
                quiz.start = Date.now();
                quiz.questions = data.results;

                nextQuestion();
            }).catch(function(err) {
                fetchFail(err);
            });
    }
}

const api = new OpenTriviaDatabase();

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
    changeButtonToReady($('button[type=submit]'), 'Start Quiz', true);
    
    changeButtonToReady($('.retry'), 'Retry', false);

    switch (err) {
        case 1:
            $('.alert>h5').text('No Results')
            $('.alert>p').text('Could not return results. The API doesn\'t have enough questions for your query.');
            break;
        case 2:
            $('.alert>h5').text('Invalid Parameter')
            $('.alert>p').text('Contains an invalid parameter. Arguements passed in aren\'t valid.');
            break;
        case 3:
            $('.alert>h5').text('Token Not Found')
            $('.alert>p').text('Session Token does not exist.');
            break;
        case 4:
            $('.alert>h5').text('Token Empty')
            $('.alert>p').text('Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.');
            $('button[type=reset]').show();
            break;
        default:
            break;
    }
}