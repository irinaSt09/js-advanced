// function playGame() {
//   window.location.href("./game-board.html");
// }
// var socket = io.connect();

var socket = io();
document.getElementById("btn-join").addEventListener("click", function () {
  alert("new room");
  socket.emit("create", "room1");
  socket.on("connectToRoom", function (data) {
    document.body.innerHTML = "";
    document.write(data);
  });
});
