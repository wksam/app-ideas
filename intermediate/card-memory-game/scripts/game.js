class Game {
    constructor() {
        if(!Game.instance) {
            this._won = 0;
            this._lost = 0;
            
            this._easyBestTime = -1;
            this._mediumBestTime = -1;
            this._hardBestTime = -1;

            this._startTime = -1;
            this._endTime = -1;
            
            Game.instance = this;
        }
        return Game.instance;
    }

    set won(won) { this._won = won; }
    get won() { return this._won; }

    set lost(lost) { this._lost = lost; }
    get lost() { return this._lost; }
    
    set easyBestTime(easyBestTime) { this._easyBestTime = easyBestTime; }
    get easyBestTime() { return this._easyBestTime; }
    
    set mediumBestTime(mediumBestTime) { this._mediumBestTime = mediumBestTime; }
    get mediumBestTime() { return this._mediumBestTime; }
    
    set hardBestTime(hardBestTime) { this._hardBestTime = hardBestTime; }
    get hardBestTime() { return this._hardBestTime; }

    set startTimee(startTime) { this._startTime = startTime; }
    get startTimee() { return this._startTime; }

    set endTime(endTime) { this._endTime = endTime; }
    get endTime() { return this._endTime; }

    set cards(cards) { this._cards = cards; }
    get cards() { return this._cards; }

    set faceUp(card) { this._faceUp = card; }
    get faceUp() { return this._faceUp; }

    set difficult(difficult) { this._difficult = difficult; }
    get difficult() { return this._difficult; }

    checkEquality(card) {
        if(this._faceUp.dataset.id != card.dataset.id) {
            this._faceUp.classList.remove('flip');
            card.classList.remove('flip');
        } else {
            this._cards.find((el) => el.cardRef === card).matched = true;
            this._cards.find((el) => el.cardRef === this._faceUp).matched = true;
            if(this.isGameOver()) showRestartMenu();
        }
        enableCards();
        this.faceUp = null;
    }

    isGameOver() {
        const left = this._cards.filter((el) => !el.matched);
        return left.length === 0;
    }
}

const game = new Game();