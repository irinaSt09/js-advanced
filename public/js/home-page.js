const playersList = document.getElementById("players");
let players = JSON.parse(localStorage.getItem("players"));
if (players) {
  playersList.innerHTML = `
<div> Players Nicknames: ${players[0]} , ${[players[1]]}
`;
}

const btnLeave = document.getElementById("btn-leave");
btnLeave.addEventListener("click", function () {
  localStorage.clear();
  window.location.href = "././games.html";
});
