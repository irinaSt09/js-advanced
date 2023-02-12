const noWinnerNoMoves = 'N';

export class Board {

    constructor() {
        this.tiles = [
            ['-', '-', '-'],
            ['-', '-', '-'],
            ['-', '-', '-']
        ];
    }

    getTile(row, col) {
        return this.tiles[row][col];
    }

    setTile(row, col, symbol) {
        this.tiles[row][col] = symbol;
    }

    print() {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                console.log(this.tiles[row][col] + " ");
            }
            console.log();
        }
    }

    hasMoreMoves() {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (this.tiles[row][col] == '-') {
                    return true;
                }
            }
        }
        return false; c
    }

    getWinnerSymbol() {
        if (this.tiles[2][0] === this.tiles[2][1] && this.tiles[2][0] === this.tiles[2][2]) {
            return this.tiles[2][0];
        }

        for (let row = 0; row < 3; row++) {
            if (this.tiles[row][0] == this.tiles[row][1] && this.tiles[row][1] == this.tiles[row][2]) {
                return this.tiles[row][0];
            }
        }

        for (let col = 0; col < 3; col++) {
            if (this.tiles[0][col] == this.tiles[1][col] && this.tiles[1][col] == this.tiles[2][col]) {
                return this.tiles[0][col];
            }
        }

        for (let i = 0; i < 3; i++) {
            if (this.tiles[0][0] == this.tiles[1][1] && this.tiles[1][1] == this.tiles[2][2]) {
                return this.tiles[0][0];
            }
        }

        for (let i = 0; i < 3; i++) {
            if (this.tiles[0][2] == this.tiles[1][1] && this.tiles[1][1] == this.tiles[2][0]) {
                return this.tiles[0][2];
            }
        }

        return noWinnerNoMoves;
    }
}