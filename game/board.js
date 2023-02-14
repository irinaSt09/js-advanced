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
        const patterns = [
            // horizontal
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            // vertical
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            // diagonal
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let pattern of patterns) {
            const [a, b, c] = pattern;
            if (this.tiles[a] !== "" && this.tiles[a] === this.tiles[b] && this.tiles[b] === this.tiles[c]) {
                return this.tiles[a];
            }
        }

        return noWinnerNoMoves;
    }

}