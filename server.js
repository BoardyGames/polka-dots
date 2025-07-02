const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

const PORT = 3000;

let players = {};
let resources = [];

function spawnResource() {
  return {
    x: Math.random() * 800,
    y: Math.random() * 600,
    amount: 5 + Math.random() * 10
  };
}

function resetGame() {
  resources = [];
  for (let i = 0; i < 20; i++) resources.push(spawnResource());
  for (const id in players) {
    players[id].x = Math.random() * 800;
    players[id].y = Math.random() * 600;
    players[id].size = 20;
    players[id].alive = true;
  }
}

io.on('connection', (socket) => {
  players[socket.id] = { x: 400, y: 300, size: 20, alive: true, color: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0') };
  socket.emit('init', { id: socket.id, players, resources });
  socket.broadcast.emit('playerJoined', { id: socket.id, player: players[socket.id] });

  socket.on('move', (data) => {
    if (!players[socket.id] || !players[socket.id].alive) return;
    players[socket.id].x = data.x;
    players[socket.id].y = data.y;
  });

  socket.on('disconnect', () => {
    delete players[socket.id];
    io.emit('playerLeft', socket.id);
  });
});

setInterval(() => {
  // TODO: handle resource collection, collisions, etc.
  io.emit('gameState', { players, resources });
}, 50);

app.use(express.static('../frontend'));

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});