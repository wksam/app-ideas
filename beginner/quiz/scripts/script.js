// let questions = [{"category": "Science: Computers","type": "boolean","difficulty": "easy","question": "Linus Torvalds created Linux and Git.","correct_answer": "True","incorrect_answers": ["False"]},{"category": "Entertainment: Music","type": "multiple","difficulty": "easy","question": "The &quot;K&quot; in &quot;K-Pop&quot; stands for which word?","correct_answer": "Korean","incorrect_answers": ["Kenyan","Kazakhstan","Kuwaiti"]},{"category": "Entertainment: Video Games","type": "boolean","difficulty": "easy","question": "In the game &quot;Subnautica&quot;, a &quot;Spadefish&quot; will attack you.","correct_answer": "False","incorrect_answers": ["True"]},{"category": "Entertainment: Video Games","type": "multiple","difficulty": "medium","question": "Which of these songs does NOT play during the Ruins segments of the 2015 game &quot;Undertale&quot;?","correct_answer": "Another Medium","incorrect_answers": ["Anticipation","Unnecessary Tension","Ruins"]},{"category": "Entertainment: Japanese Anime & Manga","type": "multiple","difficulty": "medium","question": "Which of the following anime of the mecha genre began airing in 1982?","correct_answer": "The Super Dimension Fortress Macross","incorrect_answers": ["Mobile Suit Gundam","Armored Trooper VOTOMS","Neon Genesis Evangelion"]},{"category": "General Knowledge","type": "multiple","difficulty": "hard","question": "De Eemhof, Port Zelande and Het Heijderbos are holiday villas owned by what company?","correct_answer": "Center Parcs","incorrect_answers": ["Yelloh Village","Keycamp","Villa Plus"]},{"category": "Entertainment: Music","type": "multiple","difficulty": "medium","question": "The Who&#039;s eponymous line, &quot;Teenage Wasteland&quot;, appears in which of their songs?","correct_answer": "Baba O&#039; Riley","incorrect_answers": ["The Seeker","Won&#039;t Get Fooled Again","Pinball Wizard"]},{"category": "General Knowledge","type": "multiple","difficulty": "hard","question": "Nephelococcygia is the practice of doing what?","correct_answer": "Finding shapes in clouds","incorrect_answers": ["Sleeping with your eyes open","Breaking glass with your voice","Swimming in freezing water"]},{"category": "Entertainment: Video Games","type": "multiple","difficulty": "medium","question": "Which of the following Mario Kart 8 Deluxe items will NOT make you invincible?","correct_answer": "Golden Mushroom","incorrect_answers": ["Star","Bullet Bill","Boo"]},{"category": "Entertainment: Books","type": "boolean","difficulty": "easy","question": "The Harry Potter series of books, combined, are over 1,000,000 words in length.","correct_answer": "True","incorrect_answers": ["False"]}];
init();

$('form').submit(function(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    startQuiz(form.get('n'), form.get('category'), form.get('difficulty'), form.get('type'));
});

$('.retry').click(function(e) {
    changeButtonToLoading($('.retry'));
    init();
});

$('form').on('reset', function(e) {
    api.resetToken(getCookie('token'));
});

function init() {
    changeButtonToLoading($('button[type=submit]'));
    if(hasCookie('token')) {
        if($('#category>option').length > 1) {
            $('.alert').hide();
            changeButtonToReady($('button[type=submit]'), 'Start Quiz', false);
        } else {
            api.getCategories();
        }
    } else {
        api.getToken();
    }
}

function startQuiz(amount, category, difficulty, type) {
    changeButtonToLoading($('button[type=submit]'));
    api.getQuestions(amount, category, difficulty, type);
}

function nextQuestion() {
    $('.card').remove();
    if(quiz.current < quiz.questions.length) {
        $('.container').append(createQuestionCard());
        bindButtonEvent();
    } else {
        changeButtonToReady($('button[type=submit]'), 'Start Quiz', false);
        $('.config').show();
        $('.container').append(createResultTable());
    }
}

function createQuestionCard() {
    return '<div class="card bg-light">' +
        '<div class="card-header">' +
            '<div class="d-flex justify-content-between">' +
                '<div>' + quiz.currentCategory() + ' <span class="badge badge-' + getDiffiultyBadge() + '">' + quiz.currentDifficulty() + '</span></div>' +
                '<div>Question #' + (quiz.current) + '</div>' +
            '</div>' +
        '</div>' +
        '<div class="card-body">' +
            '<h5 class="card-title">' + quiz.currentQuestion() + '</h5>' +
            '<hr>' +
            '<div class="d-flex flex-column options">' + createButtonOption() + '</div>' +
        '</div>' +
    '</div>';
}

function createButtonOption() {
    const questions = shuffle(quiz.currentIncorrectAnswers().concat(quiz.currentCorrectAnswer()));
    
    let option = '';
    for (const index in questions) {
        option += '<button class="btn btn-outline-dark' + ((index == 0) ? '' : ' mt-2') + '">' + questions[index] + '</button>';
    }
    return option;
}

function bindButtonEvent() {
    $('.card button').bind('click', function() {
        if($(this).text() == quiz.currentCorrectAnswer())
            quiz.correct_answers++;
        quiz.setCurrentAnswer($(this).text());
        quiz.current++;
        nextQuestion();
    });
}

function createResultTable() {
    return '<div class="results table-responsive">' +
        '<table class="table table-bordered">' +
            '<caption>You finished the quiz in ' + getQuizDuration() + ' and got ' + quiz.correct_answers + ' out of ' + quiz.length() + ' questions</caption>' +
            '<thead>' +
                '<tr>' +
                    '<th scope="col">#</th>' +
                    '<th scope="col">Question</th>' +
                    '<th scope="col">Correct Answer</th>' +
                    '<th scope="col">Answer</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody>' + createResultDataRows() + '</tbody>' +
        '</table>' +
    '</div>';
}

function createResultDataRows() {
    let dataRows = '';
    for (const index in quiz.questions) {
        dataRows += 
            '<tr class="table-' + ((quiz.questions[index].answer == quiz.questions[index].correct_answer) ? 'success' : 'danger') + '">' +
                '<th scope="row">' + (parseInt(index) + 1) + '</th>' +
                '<td>' + quiz.questions[index].question + '</td>' +
                '<td>' + quiz.questions[index].correct_answer + '</td>' +
                '<td>' + quiz.questions[index].answer + '</td>' +
            '</tr>';
    }
    return dataRows;
}