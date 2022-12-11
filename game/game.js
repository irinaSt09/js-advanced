class Position {

    constructor(row, column) {
        this.row = row;
        this.column = column;
    }

    get row() {
        return this.row;
    }

    get column() {
        return this.column;
    }

    set row(row) {
        this.row = row;
    }

    set column(column) {
        this.column = column;
    }
}

//----------------------------------------------------------------------------------------------------
const empty = '-';
const noWinnerNoMoves = 'N';

class Board {

    tiles = [
        [empty, empty],
        [empty, empty],
        [empty, empty]
    ];

    constructor() {
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
                if (this.tiles[row][col] == empty) {
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

//----------------------------------------------------------------------------------------------------

const maxScore = 100;
const minScore = -100;
const person = 'PERSON';
personSymbol = 'O';
computerSymbol = 'X';
isPersonTurn = false;

class Game {

    board = new Board();

    start() {
        var row = 1;
        var col = 0;

        while (this.board.hasMoreMoves()) {
            if (isPersonTurn) {
                do {
                    row = readLine("Choose row [1-3]: ");
                    col = readLine("Choose column [1-3]: ");
                    row--;
                    col--;
                } while (!canMakeTurn(row, col));

                board.setTile(row, col, personSymbol);
                console.log();
                board.print();
                isPersonTurn = false;
                if (board.getWinnerSymbol() == personSymbol) {
                    console.log("Congratulations, you win the game!");
                    return;
                }
                if (!board.hasMoreMoves()) {
                    console.log("Draw!");
                    return;
                }
            }
            let bestComputerPosition = this.findBestComputerPosition();
            board.setTile(bestComputerPosition.getRow(), bestComputerPosition.getColumn(), computerSymbol);
            console.log();
            board.print();
            isPersonTurn = true;
            if (board.getWinnerSymbol() == computerSymbol) {
                console.log("Sorry, you lost the game!");
                return;
            }
            if (!board.hasMoreMoves()) {
                console.log("Draw!");
                return;
            }

        }
    }

    canMakeTurn(row, col) {
        return board.getTile(row, col) == EMPTY;
    }

    evaluateBoard(depth) {
        winnerSymbol = board.getWinnerSymbol();
        if (winnerSymbol == computerSymbol) {
            return MAX_SCORE - depth;
        } else if (winnerSymbol == personSymbol) {
            return MIN_SCORE + depth;
        }
        return 0;
    }


    findBestComputerPosition() {
        const bestValue = -2147483648;
        bestNextPosition = new Position(-1, -1);

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board.getTile(row, col) == EMPTY) {
                    board.setTile(row, col, computerSymbol);
                    currentValue = minimizer(bestValue, 2147483648, 0);
                    board.setTile(row, col, EMPTY);

                    if (currentValue > bestValue) {
                        bestNextPosition.setRow(row);
                        bestNextPosition.setColumn(col);
                        bestValue = currentValue;
                    }
                }
            }
        }
        return bestNextPosition;
    }

    minimizer(a, b, depth) {
        currentResult = evaluateBoard(depth);
        if (currentResult != 0) {
            return currentResult;
        }
        if (!board.hasMoreMoves()) {
            return 0;
        }
        return makeMinimize(a, b, depth);
    }

    makeMinimize(a, b, depth) {
        bestResult = Integer.MAX_VALUE;
        for (row = 0; row < 3; row++) {
            for (col = 0; col < 3; col++) {
                if (board.getTile(row, col) == EMPTY) {
                    board.setTile(row, col, personSymbol);
                    bestResult = Math.min(bestResult, maximizer(a, b, depth + 1));
                    board.setTile(row, col, EMPTY);
                    if (bestResult <= a) {
                        return bestResult;
                    }
                    b = Math.min(b, bestResult);
                }
            }
        }
        return bestResult;
    }

    maximizer(a, b, depth) {
        currentResult = evaluateBoard(depth);
        if (currentResult != 0) {
            return currentResult;
        }
        if (!board.hasMoreMoves()) {
            return 0;
        }
        return makeMaximize(a, b, depth);
    }



    makeMaximize(a, b, depth) {
        bestScore = Integer.MIN_VALUE;
        for (row = 0; row < 3; row++) {
            for (col = 0; col < 3; col++) {
                if (board.getTile(row, col) == EMPTY) {
                    board.setTile(row, col, computerSymbol);
                    bestScore = Math.max(bestScore, minimizer(a, b, depth + 1));
                    board.setTile(row, col, EMPTY);
                    if (bestScore >= b) {
                        return bestScore;
                    }
                    a = Math.max(a, bestScore);
                }
            }
        }
        return bestScore;
    }
}


//----------------------------------------------------------------------------------------------------

game = new Game();

game.start();
//----------------------------------------------------------------------------------------------------