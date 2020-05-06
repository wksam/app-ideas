class Quiz {
    constructor() {
        if(!Quiz.instance)
            Quiz.instance = this;
        this._current = 0;
        this._correct_answers = 0;
        return Quiz.instance;
    }

    set current(current) { this._current = current; }
    get current() { return this._current; }

    set start(start) { this._start = start; }
    get start() { return this._start; }

    set questions(questions) { this._questions = questions; }
    get questions() { return this._questions; }

    set correct_answers(correct) { this._correct_answers = correct; }
    get correct_answers() { return this._correct_answers; }

    length() { return this._questions.length; }

    currentCategory() { return this._questions[this._current].category; }
    currentDifficulty() { return this._questions[this._current].difficulty; }
    currentQuestion() { return this._questions[this._current].question; }
    currentCorrectAnswer() { return this._questions[this._current].correct_answer; }
    currentIncorrectAnswers() { return this._questions[this._current].incorrect_answers; }

    setCurrentAnswer(answer) { this._questions[this._current].answer = answer }
}

const quiz = new Quiz();