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
}

const game = new Game();