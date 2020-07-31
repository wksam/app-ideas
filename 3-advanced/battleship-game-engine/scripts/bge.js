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
        this._boardMask = this._generateBoard(this._size);
        this._board2 = this._generateBoard(this._size);
        this._board2Mask = this._generateBoard(this._size);
        this._putShips(this._board, this._ships);
        this._putShips(this._board2, this._ships);
        return this._board
    }

    _generateBoard(size) {
        return new Array(size).fill().map(() => Array(size).fill(' '));
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
    }

    _canBePlaced(board, ship, x, y, currentSize, direction) {
        if((x >= this._size || y >= this._size)) return false;
        if(board[y][x] !== ' ') return false;
        if(currentSize < ship.size) {
            currentSize++;
            switch (direction) {
                case 0:
                    x++;
                    return this._canBePlaced(board, ship, x, y, currentSize, direction);
                case 1:
                    y++;
                    return this._canBePlaced(board, ship, x, y, currentSize, direction);
            }
        }
        return true;
    }

    shoot(player, x, y) {
        x--;
        y--;
        if(x < 0 || x >= this._size || y < 0 || y >= this._size) return;

        if(player === 1) {
            this._board2Mask[y][x] = this._board2[y][x] !== ' ' ? 'X' : 'O';
            return this._board2Mask;
        } else {
            this._boardMask[y][x] = this._board[y][x] !== ' ' ? 'X' : 'O';
            return this._boardMask;
        }
    }
}

const ships = [{
    name: 'Destroyer',
    size: 2,
    id: 'D'
}, {
    name: 'Cruiser',
    size: 3,
    id: 'C'
}, {
    name: 'Battleship',
    size: 4,
    id: 'B'
}];

const gameEngine = new BGE(8, ships);
console.log(gameEngine.startGame());