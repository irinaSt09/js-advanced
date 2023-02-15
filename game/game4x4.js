import { Board } from "./board4x4.js"
import { Position } from "./position.js";

const maxScore = 10;
const minScore = -10;
let personSymbol = 'O';
let computerSymbol = 'X';

export class Game {

    constructor() {
        this.board = new Board();
    }

    start(cells) {
        let row = 0;
        let col = 0;
        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener("click", () => {
                let coordinates = findCellIndex(i)
                row = coordinates[0];
                col = coordinates[1];
                if (!this.canMakeTurn(row, col)) {
                    alert("wrong move")
                } else {
                    cells[i].innerHTML = personSymbol
                    console.log(this.board)
                    this.board.setTile(row, col, personSymbol);
                    if (!this.checkForWinner()) {
                        this.makeCompTurn()
                    }
                }
            });
        }
    }

    makeCompTurn() {
        if (this.board.hasMoreMoves()) {
            let bestComputerPosition = this.findBestComputerPosition();
            this.board.setTile(bestComputerPosition.row, bestComputerPosition.column, computerSymbol);
            this.changeComputerSymbol(bestComputerPosition.row, bestComputerPosition.column)
            if (this.checkForWinner()) {
                return;
            }
        }
    }

    changeComputerSymbol(row, col) {
        let cellID = "cell-" + (row * 4 + col)
        let cell = document.getElementById(cellID)
        cell.innerHTML = computerSymbol
    }

    canMakeTurn(row, col) {
        return this.board.getTile(row, col) == '-';
    }

    checkForWinner() {
        if (this.board.getWinnerSymbol() == personSymbol) {
            alert("You win!")
            return true;
        } else if (this.board.getWinnerSymbol() == computerSymbol) {
            alert("Sorry, you lost the game!");
            return true;
        } else if (!this.board.hasMoreMoves()) {
            alert("Draw!");
            return true;
        }

        return false;
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

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (this.board.getTile(row, col) == '-') {
                    this.board.setTile(row, col, computerSymbol);
                    let currentValue = this.minimizer(bestValue, 2147483648, 0);
                    this.board.setTile(row, col, '-');

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
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (this.board.getTile(row, col) == '-') {
                    this.board.setTile(row, col, personSymbol);
                    bestResult = Math.min(bestResult, this.maximizer(a, b, depth + 1));
                    this.board.setTile(row, col, '-');
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
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (this.board.getTile(row, col) == '-') {
                    this.board.setTile(row, col, computerSymbol);
                    bestScore = Math.max(bestScore, this.minimizer(a, b, depth + 1));
                    this.board.setTile(row, col, '-');
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
function findCellIndex(id) {
    let coordinates = [0, 0];
    switch (id) {
        case 0:
            coordinates = [0, 0];
            break;
        case 1:
            coordinates = [0, 1];
            break;
        case 2:
            coordinates = [0, 2];
            break;
        case 3:
            coordinates = [0, 3];
            break;
        case 4:
            coordinates = [1, 0];
            break;
        case 5:
            coordinates = [1, 1];
            break;
        case 6:
            coordinates = [1, 2];
            break;
        case 7:
            coordinates = [1, 3];
            break;
        case 8:
            coordinates = [2, 0];
            break;
        case 9:
            coordinates = [2, 1];
            break;
        case 10:
            coordinates = [2, 2];
            break;
        case 11:
            coordinates = [2, 3];
            break;
        case 12:
            coordinates = [3, 0];
            break;
        case 13:
            coordinates = [3, 1];
            break;
        case 14:
            coordinates = [3, 2];
            break;
        case 15:
            coordinates = [3, 3];
            break;
        default:
            console.log("Input is incorrect");
            break;
    }

    return coordinates;
}
