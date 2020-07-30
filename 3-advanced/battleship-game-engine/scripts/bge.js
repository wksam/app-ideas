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
        this._putShips(this._board, this._ships);
    }

    _generateBoard(size) {
        return new Array(size).fill().map(() => Array(size).fill(0));
    }

    _getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    _getRandomPosition(min, max) {
        return [this._getRandomInt(min, max), this._getRandomInt(min, max)];
    }

    _putShips(board, ships) {
        let reposition = false;

        for (const ship of ships) {
            do {
                const [positionY, positionX] = this._getRandomPosition(0, board.length);
                const direction = this._getRandomInt(0, 2);

                if(this._canBePlaced(board, ship, positionX, positionY, 0, direction)) {
                    for (let i = 0; i < ship.size; i++) {
                        switch (direction) {
                            case 0:
                                board[positionY][positionX + i] = ship.id;
                                break;
                            case 1:
                                board[positionY + i][positionX] = ship.id;
                                break;
                        }
                    }
                    reposition = false;
                } else {
                    reposition = true;
                }
            } while (reposition);
        }
        console.log(board);
    }

    _canBePlaced(board, ship, x, y, currentSize, direction) {
        if(currentSize < ship.size) {
            if((x >= board.length || y >= board.length) || board[x][y] !== 0) return false;
            currentSize++;
            switch (direction) {
                case 0:
                    x++;
                    return this._canBePlaced(board, ship, x, y, currentSize, direction);
                case 1:
                    y++;
                    return this._canBePlaced(board, ship, x, y, currentSize, direction);
            }
        } else {
            return true;
        }
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
gameEngine.startGame();