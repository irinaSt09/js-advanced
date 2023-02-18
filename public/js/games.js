const firebaseConfig = {
  apiKey: "AIzaSyB0tD1jeGxQpJ6x1VK6-BKv6dZ12O2o5lQ",
  authDomain: "tic-tac-toe-a0f2f.firebaseapp.com",
  projectId: "tic-tac-toe-a0f2f",
  storageBucket: "tic-tac-toe-a0f2f.appspot.com",
  messagingSenderId: "1020026501154",
  appId: "1:1020026501154:web:045b986e4bd1611f0a727b",
};

const app = firebase.initializeApp(firebaseConfig);

let db = app.firestore();

const gameSection = document.querySelector(".games-section");

db.collection("games")
  .get()
  .then((games) => {
    games.forEach((game) => {
      showGame(game);
    });
  });
const showGame = (game) => {
  const data = game.data();
  gameSection.innerHTML += `
      <div class="game-fields">
        <h1>Game Tic Tac Toe</h1>
        <p class="game-description">Players number: ${data.players_number}</p>
        <p class="game-description">Opponent: ${data.partner}</p>
        <p class="game-description">Board: ${data.board}</p>
        <p class = "room-number"> Room: 1... </p>
        <div class="my-div"></div>
        <button id="join-btn" class="bnt">Join</button>
      </div>
    `;
  isBoard(data.board, game.id);
};

function isBoard(board, gameId) {
  const myDivs = document.querySelectorAll(".my-div");
  myDivs.forEach((myDiv) => {
    switch (board) {
      case "4x4":
        console.log(board);
        myDiv.innerHTML = `<a href="computer-play-board4x4.html" class="read-bnt" id="read-btn">Play</a>`;
        break;
      case "3x3":
        myDiv.innerHTML = `<a href="computer-play-board.html?${gameId}" class="read-bnt" id="read-btn">Play</a>`;
        break;
      default:
        myDiv.innerHTML = `<a href="computer-play-board.html?${gameId}" class="read-bnt" id="read-btn">Play</a>`;
    }
  });
}

var socket = io.connect();

var room = "gameRoom";
const players = []; // room1 - players...

const btnJoin = document.getElementById("join-btn");
if (btnJoin) {
  btnJoin.addEventListener("click", function () {
    // io.emit("playerJoined", socket.id);

    // console.log("clicked");

    // let text;
    // var newPlayer;
    // let person = prompt("Please enter your name:", "");
    // if (person == null || person == "") {
    //   text = "User cancelled the prompt.";
    // } else {
    //   text = "Hello " + person;

    //   //if (players.length < 2) {
    //   // != sockets check
    //   players.push(person);
    //   console.log(players);
    //   localStorage.setItem("players", JSON.stringify(players)); // array
    //   // localStorage.setItem("nickname", person); // socket -
    //   //} else console.log("Sorry, room is full!");

    //if (players.length >= 2)
    window.location.href = "././home-page.html";

    // socket.on("connectToRoom", function (data) {
    //   document.body.innerHTML = "";
    //   document.write(data);
    //   console.log(data);
    //   alert(data);
    // });
  });
}
