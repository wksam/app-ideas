let current = 0;
let results;
let start;

$('form').submit(function(e) {
    e.preventDefault();
    startQuiz();
});

function startQuiz() {
    $('.config').hide();
    $('.results').remove();

    current = 0;
    start = Date.now();
    results = [{"category": "Science: Computers","type": "boolean","difficulty": "easy","question": "Linus Torvalds created Linux and Git.","correct_answer": "True","incorrect_answers": ["False"]},{"category": "Entertainment: Music","type": "multiple","difficulty": "easy","question": "The &quot;K&quot; in &quot;K-Pop&quot; stands for which word?","correct_answer": "Korean","incorrect_answers": ["Kenyan","Kazakhstan","Kuwaiti"]},{"category": "Entertainment: Video Games","type": "boolean","difficulty": "easy","question": "In the game &quot;Subnautica&quot;, a &quot;Spadefish&quot; will attack you.","correct_answer": "False","incorrect_answers": ["True"]},{"category": "Entertainment: Video Games","type": "multiple","difficulty": "medium","question": "Which of these songs does NOT play during the Ruins segments of the 2015 game &quot;Undertale&quot;?","correct_answer": "Another Medium","incorrect_answers": ["Anticipation","Unnecessary Tension","Ruins"]},{"category": "Entertainment: Japanese Anime & Manga","type": "multiple","difficulty": "medium","question": "Which of the following anime of the mecha genre began airing in 1982?","correct_answer": "The Super Dimension Fortress Macross","incorrect_answers": ["Mobile Suit Gundam","Armored Trooper VOTOMS","Neon Genesis Evangelion"]},{"category": "General Knowledge","type": "multiple","difficulty": "hard","question": "De Eemhof, Port Zelande and Het Heijderbos are holiday villas owned by what company?","correct_answer": "Center Parcs","incorrect_answers": ["Yelloh Village","Keycamp","Villa Plus"]},{"category": "Entertainment: Music","type": "multiple","difficulty": "medium","question": "The Who&#039;s eponymous line, &quot;Teenage Wasteland&quot;, appears in which of their songs?","correct_answer": "Baba O&#039; Riley","incorrect_answers": ["The Seeker","Won&#039;t Get Fooled Again","Pinball Wizard"]},{"category": "General Knowledge","type": "multiple","difficulty": "hard","question": "Nephelococcygia is the practice of doing what?","correct_answer": "Finding shapes in clouds","incorrect_answers": ["Sleeping with your eyes open","Breaking glass with your voice","Swimming in freezing water"]},{"category": "Entertainment: Video Games","type": "multiple","difficulty": "medium","question": "Which of the following Mario Kart 8 Deluxe items will NOT make you invincible?","correct_answer": "Golden Mushroom","incorrect_answers": ["Star","Bullet Bill","Boo"]},{"category": "Entertainment: Books","type": "boolean","difficulty": "easy","question": "The Harry Potter series of books, combined, are over 1,000,000 words in length.","correct_answer": "True","incorrect_answers": ["False"]}];

    nextQuestion();
}

function nextQuestion() {
    $('.card').remove();

    if(current < results.length) {
        $('.container').append(createQuestionCard());
        bindButtonEvent();
    } else {
        $('.config').show();
        $('.container').append(createResultTable());
    }
}

function createQuestionCard() {
    return '<div class="card bg-light">' +
        '<div class="card-header">' +
            '<div class="d-flex justify-content-between">' +
                '<div>' + results[current].category + ' <span class="badge badge-' + getDiffiultyBadge() + '">' + results[current].difficulty + '</span></div>' +
                '<div>Question #' + (current + 1) + '</div>' +
            '</div>' +
        '</div>' +
        '<div class="card-body">' +
            '<h5 class="card-title">' + results[current].question + '</h5>' +
            '<hr>' +
            '<div class="d-flex flex-column options">' + createButtonOption() + '</div>' +
        '</div>' +
    '</div>';
}

function getDiffiultyBadge() {
    switch (results[current].difficulty) {
        case 'easy':
            return 'success';
        case 'medium':
            return 'warning';
        case 'hard':
            return 'danger';
        default:
            return '';
    }
}

function createButtonOption() {
    const questions = shuffle(results[current].incorrect_answers.concat(results[current].correct_answer));
    
    let option = '';
    for (const index in questions) {
        option += '<button class="btn btn-outline-dark' + ((index == 0) ? '' : ' mt-2') + '">' + questions[index] + '</button>';
    }
    return option;
}

function shuffle(array) {
    let n = array.length;
    let temp;
    let index;

    while (n > 0) {
        index = Math.floor(Math.random() * n);
        n--;
        temp = array[n];
        array[n] = array[index];
        array[index] = temp;
    }
    return array;
}

function bindButtonEvent() {
    $('.card button').bind('click', function() {
        results[current].answer = $(this).text();
        current++;
        nextQuestion();
    });
}

function createResultTable() {
    return '<div class="results table-responsive">' +
        '<table class="table table-bordered">' +
            '<caption>You finished the quiz in ' + getQuizDuration() + ' and got ' + getNumberCorrectAnswers() + ' out of ' + results.length + ' questions</caption>' +
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
    for (const index in results) {
        dataRows += 
            '<tr class="table-' + ((results[index].answer == results[index].correct_answer) ? 'success' : 'danger') + '">' +
                '<th scope="row">' + index + '</th>' +
                '<td>' + results[index].question + '</td>' +
                '<td>' + results[index].correct_answer + '</td>' +
                '<td>' + results[index].answer + '</td>' +
            '</tr>';
    }
    return dataRows;
}

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

function getQuizDuration() {
    const duration = Date.now() - start;
    const seconds = Math.floor(duration / SECOND);
    const minutes = Math.floor(duration / MINUTE);
    const hours = Math.floor(duration / HOUR);

    return ((hours < 10) ? '0' + hours : hours) + ':' +
        ((minutes < 10) ? '0' + minutes : minutes) + ':' +
        ((seconds < 10) ? '0' + seconds : seconds);
}

function getNumberCorrectAnswers() {
    let correct_answers = 0;
    for (const question of results) {
        if(question.answer == question.correct_answer)
            correct_answers++;
    }
    return correct_answers;
}