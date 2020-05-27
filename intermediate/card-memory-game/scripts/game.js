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

            this._faceUp = [];
            
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

    set difficult(difficult) { this._difficult = difficult; }
    get difficult() { return this._difficult; }

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
            if(this.isGameOver()) showRestartMenu();
        }
        this.faceUp = null;
    }

    isGameOver() {
        const left = this._cards.filter((el) => !el.matched);
        return left.length === 0;
    }
}

const game = new Game();