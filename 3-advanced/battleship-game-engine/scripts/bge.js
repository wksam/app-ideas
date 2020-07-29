class BGE {
    constructor(size, ships) {
        if (BGE.instance instanceof BGE) {
            return BGE.instance;
        }
        this._size = size;
        this._ships = ships;
        BGE.instance = this;
    }

    startGame() {
        this._board = this._generateBoard(this._size);
    }

    _generateBoard(size) {
        return Array(size).fill(Array(size).fill(0));
    }

    _getRandomPosition(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return [Math.floor(Math.random() * (max - min)) + min, Math.floor(Math.random() * (max - min)) + min];
    }
}

const ships = [{
    name: 'Destroyer',
    size: 2,
    id: 11
}, {
    name: 'Cruiser',
    size: 3,
    id: 12
}, {
    name: 'Battleship',
    size: 4,
    id: 13
}];

const gameEngine = new BGE(8, ships);