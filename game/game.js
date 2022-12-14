import { Board, EMPTY } from "./board.js"
import { Position } from "./position.js";
import * as readlineSync from 'readline-sync';

const maxScore = 100;
const minScore = -100;
const person = 'PERSON';
let personSymbol = 'O';
let computerSymbol = 'X';
let isPersonTurn = false;

export class Game {

    board = new Board();

    start() {
        let row = 0;
        let col = 0;

        while (this.board.hasMoreMoves()) {
            if (isPersonTurn) {
                do {
                    row = readlineSync.question("Choose row [1-3]: ");
                    col = readlineSync.question("Choose column [1-3]: ");
                    row--;
                    col--;
                } while (!this.canMakeTurn(row, col));

                this.board.setTile(row, col, personSymbol);
                console.log();
                this.board.print();
                isPersonTurn = false;
                if (this.board.getWinnerSymbol() == personSymbol) {
                    console.log("Congratulations, you win the game!");
                    return;
                }
                if (!this.board.hasMoreMoves()) {
                    console.log("Draw!");
                    return;
                }
            }
            let bestComputerPosition = this.findBestComputerPosition();
            this.board.setTile(bestComputerPosition.row, bestComputerPosition.column, computerSymbol);
            console.log();
            this.board.print();
            isPersonTurn = true;
            if (this.board.getWinnerSymbol() == computerSymbol) {
                console.log("Sorry, you lost the game!");
                return;
            }
            if (!this.board.hasMoreMoves()) {
                console.log("Draw!");
                return;
            }

        }
    }

    canMakeTurn(row, col) {
        return this.board.getTile(row, col) == EMPTY;
    }

    evaluateBoard(depth) {
        let winnerSymbol = this.board.getWinnerSymbol();
        if (winnerSymbol == computerSymbol) {
            return maxScore - depth;
        } else if (winnerSymbol == personSymbol) {
            return minScore + depth;
        }
        return 0;
    }


    findBestComputerPosition() {
        let bestValue = -2147483648;
        let bestNextPosition = new Position(-1, -1);

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (this.board.getTile(row, col) == EMPTY) {
                    this.board.setTile(row, col, computerSymbol);
                    let currentValue = this.minimizer(bestValue, 2147483648, 0);
                    this.board.setTile(row, col, EMPTY);

                    if (currentValue > bestValue) {
                        bestNextPosition.row = row;
                        bestNextPosition.column = col;
                        bestValue = currentValue;
                    }
                }
            }
        }
        return bestNextPosition;
    }

    minimizer(a, b, depth) {
        let currentResult = this.evaluateBoard(depth);
        if (currentResult != 0) {
            return currentResult;
        }
        if (!this.board.hasMoreMoves()) {
            return 0;
        }
        return this.makeMinimize(a, b, depth);
    }

    makeMinimize(a, b, depth) {
        let bestResult = 2147483648;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (this.board.getTile(row, col) == EMPTY) {
                    this.board.setTile(row, col, personSymbol);
                    bestResult = Math.min(bestResult, this.maximizer(a, b, depth + 1));
                    this.board.setTile(row, col, EMPTY);
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
        let currentResult = this.evaluateBoard(depth);
        if (currentResult != 0) {
            return currentResult;
        }
        if (!this.board.hasMoreMoves()) {
            return 0;
        }
        return this.makeMaximize(a, b, depth);
    }



    makeMaximize(a, b, depth) {
        let bestScore = -2147483648;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (this.board.getTile(row, col) == EMPTY) {
                    this.board.setTile(row, col, computerSymbol);
                    bestScore = Math.max(bestScore, this.minimizer(a, b, depth + 1));
                    this.board.setTile(row, col, EMPTY);
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