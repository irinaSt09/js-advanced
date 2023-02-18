function clearBoard() {
  const cells = board.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.innerText = "";
  });
}
