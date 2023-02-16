// function playGame() {
//   window.location.href("./game-board.html");
// }
// var socket = io.connect();

// var socket = io();
// document.getElementById("btn-join").addEventListener("click", function () {
//   alert("new room");
//   socket.emit("create", "room1");
//   socket.on("connectToRoom", function (data) {
//     document.body.innerHTML = "";
//     document.write(data);
//   });
// });

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
