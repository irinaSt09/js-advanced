import { Game } from "./game.js";

var game = new Game();

const board = document.getElementById("board");
const cells = board.getElementsByTagName("td");

//game.start(cells)

// Define startNewGame function in the global scope
window.startNewGame = function () {
    game.start(cells);
};

window.restartGame = function () {
    location.reload();
    game = new Game();
};
