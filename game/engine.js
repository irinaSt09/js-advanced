import { Game } from "./game.js";

const game = new Game();

const board = document.getElementById("board");
const cells = board.getElementsByTagName("td");

game.start(cells)