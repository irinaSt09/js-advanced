const empty = '-';
const noWinnerNoMoves = 'N';

class Board {

    constructor() {
        tiles = new char[3][3];
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                tiles[row][col] = empty;
            }
        }
    }

    getTile(row, col) {
        return tiles[row][col];
    }

    setTile(row, col, symbol) {
        tiles[row][col] = symbol;
    }

    print() {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                console.log(tiles[row][col] + " ");
            }
            console.log();
        }
    }

    hasMoreMoves() {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (tiles[row][col] == empty) {
                    return true;
                }
            }
        }
        return false;
    }

    getWinnerSymbol() {
        for (let row = 0; row < 3; row++) {
            if (tiles[row][0] == tiles[row][1] && tiles[row][1] == tiles[row][2]) {
                return tiles[row][0];
            }
        }

        for (let col = 0; col < 3; col++) {
            if (tiles[0][col] == tiles[1][col] && tiles[1][col] == tiles[2][col]) {
                return tiles[0][col];
            }
        }

        for (let i = 0; i < 3; i++) {
            if (tiles[0][0] == tiles[1][1] && tiles[1][1] == tiles[2][2]) {
                return tiles[0][0];
            }
        }

        for (let i = 0; i < 3; i++) {
            if (tiles[0][2] == tiles[1][1] && tiles[1][1] == tiles[2][0]) {
                return tiles[0][2];
            }
        }

        return noWinnerNoMoves;
    }
}