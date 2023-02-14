
const firebaseConfig = {
    apiKey: "AIzaSyB0tD1jeGxQpJ6x1VK6-BKv6dZ12O2o5lQ",
    authDomain: "tic-tac-toe-a0f2f.firebaseapp.com",
    projectId: "tic-tac-toe-a0f2f",
    storageBucket: "tic-tac-toe-a0f2f.appspot.com",
    messagingSenderId: "1020026501154",
    appId: "1:1020026501154:web:045b986e4bd1611f0a727b"
};

const app = firebase.initializeApp(firebaseConfig);

let db = app.firestore();

const gameSection = document.querySelector('.games-section');

db.collection("games").get().then((games) => {
    games.forEach(game => {
        showGame(game);
    })
})

const showGame = (game) => {
    let data = game.data();
    gameSection.innerHTML += `
    <div class="game-fields">
        <h1>Game Tic Tac Toe</h1>
        <p class="game-description">Players number: ${data.players_number}</p>
        <p class="game-description">Opponent: ${data.partner}</p>
        <a href="home-page.html?${game.id}" class="read-bnt" id="read-btn">Play</a>
    </div>
    `;
}

var socket = io.connect();

var room = "gameRoom";
const players = {};

const btnPlay = document.querySelector(".read-bnt");
if(btnPlay)
    {
        btnPlay.addEventListener("click", function() {
            //alert('clicked');
            socket.emit('join', room);
            console.log('joined');
        });
    }

// socket.on('join', function() {
//     // socket.emit('roomName', room);
//     // console.log('joined');
//     // console.log(room);
// })
