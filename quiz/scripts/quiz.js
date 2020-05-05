class Quiz {
    constructor() {
        if(!Quiz.instance)
            Quiz.instance = this;
        this.current = 0;
        this.correct_answers = 0;
        return Quiz.instance;
    }

    set current(current) { this.current = current; }
    get current() { return this.current; }

    set start(start) { this.start = start; }
    get start() { return this.start; }

    set questions(questions) { this.questions = questions; }
    get questions() { return this.questions; }

    currentCategory() { return this.questions[this.current].category; }
    currentDifficulty() { return this.questions[this.current].difficulty; }
    currentQuestion() { return this.questions[this.current].question; }
    currentCorrectAnswer() { return this.questions[this.current].correct_answer; }
    currentIncorrectAnswers() { return this.questions[this.current].incorrect_answers; }

    setCurrentAnswer(answer) { this.questions[this.current].answer = answer }
}

const quiz = new Quiz();