const noWinnerNoMoves = 'N';

export class Board {

    constructor() {
        this.tiles = [
            ['-', '-', '-', '-'],
            ['-', '-', '-', '-'],
            ['-', '-', '-', '-'],
            ['-', '-', '-', '-']
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
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (this.tiles[row][col] == '-') {
                    return true;
                }
            }
        }
        return false;
    }

    getWinnerSymbol() {

        for (let row = 0; row < 4; row++) {
            if (this.tiles[row][0] == this.tiles[row][1]
                && this.tiles[row][1] == this.tiles[row][2]
                && this.tiles[row][2] == this.tiles[row][3]) {
                return this.tiles[row][0];
            }
        }

        for (let col = 0; col < 4; col++) {
            if (this.tiles[0][col] == this.tiles[1][col]
                && this.tiles[1][col] == this.tiles[2][col]
                && this.tiles[2][col] == this.tiles[3][col]) {
                return this.tiles[0][col];
            }
        }

        if (this.tiles[0][0] == this.tiles[1][1]
            && this.tiles[1][1] == this.tiles[2][2]
            && this.tiles[2][2] == this.tiles[3][3]) {
            return this.tiles[0][0];
        }

        if (this.tiles[0][3] == this.tiles[1][2]
            && this.tiles[1][2] == this.tiles[2][1]
            && this.tiles[2][1] == this.tiles[3][0]) {
            return this.tiles[0][3];
        }

        return noWinnerNoMoves;
    }

}