class Game {
    constructor() {
        if(!Game.instance) {
            this._won = 0;
            this._lost = 0;
            
            this._startTime = -1;
            this._endTime = -1;

            this._faceUp = [];
            this._timers = { 'easy': -1, 'medium': -1, 'hard': -1 };
            this._timeLimit = { 'easy': 60000, 'medium': 180000, 'hard': 300000 };
            
            Game.instance = this;
        }
        return Game.instance;
    }

    set won(won) { this._won = won; }
    get won() { return this._won; }

    set lost(lost) { this._lost = lost; }
    get lost() { return this._lost; }
    
    set startTime(startTime) { this._startTime = startTime; }
    get startTime() { return this._startTime; }

    set endTime(endTime) { this._endTime = endTime; }
    get endTime() { return this._endTime; }

    set cards(cards) { this._cards = cards; }
    get cards() { return this._cards; }

    set difficult(difficult) { this._difficult = difficult; }
    get difficult() { return this._difficult; }

    setTimer(time) {
        this._timers[this.difficult.name] = time;
    }

    getTimer() { return this._timers; }

    queueFaceUpSize() {
        return this._faceUp.length;
    }

    queueFaceUp(card) {
        this._faceUp.push(card);
    }

    dequeueFaceUp() {
        return this._faceUp.shift();
    }

    checkEquality() {
        const first = this.dequeueFaceUp();
        const second = this.dequeueFaceUp();

        if(first.dataset.id != second.dataset.id) {
            first.classList.remove('flip');
            second.classList.remove('flip');
            enableCard(first);
            enableCard(second);
        } else {
            this._cards.find((el) => el.cardRef === first).matched = true;
            this._cards.find((el) => el.cardRef === second).matched = true;
            if(this.isGameOver()) {
                this._endTime = Date.now();
                this._won++;
                this.stopTimer();
                showRestartMenu();
            }
        }
        this.faceUp = null;
    }

    isGameOver() {
        const left = this._cards.filter((el) => !el.matched);
        return left.length === 0;
    }

    startTimer() {
        this.startTime = Date.now();
        this.endTime = -1;
        this._intervalId = setInterval(updateTimer, 100);
    }

    percentGone() {
        return (Date.now() - this.startTime) / this._timeLimit[this.difficult.name];
    }

    stopTimer() {
        clearInterval(this._intervalId);
    }
}

const game = new Game();