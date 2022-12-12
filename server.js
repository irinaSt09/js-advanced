const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 5500;

const {join} = require('path'); // to join paths
app.use(express.static('public')) // serve the static files
const cwd = process.cwd(); // current working directory

const clients = {}; // to save connected clients

app.get('/', (req, res) => {
   // res.sendFile(__dirname + '/index.html');
   const path = join(cwd, 'public', 'index.html'); // working only with "public" and "index" names
   res.sendFile(path); // or readstream
});

const addClient = socket => {
    console.log("New client connected", socket.id);
    clients[socket.id] = socket;
};

const removeClient = socket => {
    console.log("Client disconnected", socket.id);
    delete clients[socket.id];
};

io.sockets.on("connection", socket => {
    let id = socket.id;

    addClient(socket);

    socket.on("mousemove", data => {
        data.id = id;
        socket.broadcast.emit("moving", data);
    });

    socket.on("disconnect", () => {
        removeClient(socket);
        socket.broadcast.emit("clientdisconnect", id);
    });
});
  
server.listen(port, () => {
    console.log(`listening on port ${port}`);
});