import { Game } from "./game.js";

const game = new Game();

const board = document.getElementById("board");
const cells = board.getElementsByTagName("td");

//game.start(cells)

// Define startNewGame function in the global scope
window.startNewGame = function() {
    game.start(cells);
};