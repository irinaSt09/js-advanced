const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 5500;

const { join } = require("path"); // to join paths
app.use(express.static("public")); // serve the static files
const cwd = process.cwd(); // current working directory

const players = {}; // object to keep track of players and their marks

let currentTurn = "X"; // starting player mark

app.get("/", (req, res) => {
  const path = join(cwd, "public", "index.html");
  res.sendFile(path);
});

app.get("/game/engine4x4.js", (req, res) => {
  res.set("Content-Type", "application/javascript");
  res.sendFile(__dirname + "/game/engine4x4.js");
});

app.get("/game/game4x4.js", (req, res) => {
  res.set("Content-Type", "application/javascript");
  res.sendFile(__dirname + "/game/game4x4.js");
});

app.get("/game/board4x4.js", (req, res) => {
  res.set("Content-Type", "application/javascript");
  res.sendFile(__dirname + "/game/board4x4.js");
});
app.get("/game/engine.js", (req, res) => {
  res.set("Content-Type", "application/javascript");
  res.sendFile(__dirname + "/game/engine.js");
});

app.get("/game/game.js", (req, res) => {
  res.set("Content-Type", "application/javascript");
  res.sendFile(__dirname + "/game/game.js");
});

app.get("/game/board.js", (req, res) => {
  res.set("Content-Type", "application/javascript");
  res.sendFile(__dirname + "/game/board.js");
});

app.get("/game/position.js", (req, res) => {
  res.set("Content-Type", "application/javascript");
  res.sendFile(__dirname + "/game/position.js");
});

// const addClient = (socket) => {
//   console.log("New client connected", socket.id);
//   users[socket.id] = socket;
// };

// const removeClient = (socket) => {
//   console.log("Client disconnected", socket.id);
//   delete users[socket.id];
// };

io.on("connection", (socket) => {
  console.log(`A new player connected: ${socket.id}`);

  // assign a mark to the player
  if (Object.keys(players).length === 0) {
    players[socket.id] = "X";
  } else if (Object.keys(players).length === 1) {
    players[socket.id] = "O";
  }

  // send the mark to the player
  socket.emit("mark", players[socket.id]);

  // notify all players of the new player
  io.emit("players", Object.values(players));

  socket.on("move", (data) => {
    const { row, col } = data;

    // check if it's the player's turn
    if (players[socket.id] === currentTurn) {
      // switch to the next player
      currentTurn = currentTurn === "X" ? "O" : "X";

      // send the move to all players
      io.emit("move", { mark: players[socket.id], row, col });
    }
  });

  socket.on("disconnect", () => {
    console.log(`Player disconnected: ${socket.id}`);
    delete players[socket.id];
    io.emit("players", Object.values(players));
  });
});

// var room = 1; // name
// io.sockets.on("connection", (socket) => {
//   let id = socket.id;
//   //addClient(socket);

//   socket.join("room-" + room);
//   io.sockets.in("room-" + room).emit(
//     "connectToRoom",
//     "New player joined room number " + room, //+ " with socket id: " + socket.id,

//     function () {
//       clients.push(socket.id);
//       console.log(clients);
//       // if (clients.length == 2) {
//       //   console.log("can start game"); // TODO: redirect to game board/Play
//       // }
//     }
//   );

//   // socket.leave("room" + room);

//   socket.on("disconnect", () => {
//     //removeClient(socket);
//     socket.broadcast.emit("clientdisconnect", id);
//   });
// });

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
