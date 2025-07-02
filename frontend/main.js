const socket = io('http://localhost:3000');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let myId;
let players = {};
let resources = [];

let mouse = { x: 400, y: 300 };

socket.on('init', (data) => {
  myId = data.id;
  players = data.players;
  resources = data.resources;
});

socket.on('gameState', (data) => {
  players = data.players;
  resources = data.resources;
  draw();
});

canvas.addEventListener('mousemove', (e) => {
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
  socket.emit('move', { x: mouse.x, y: mouse.y });
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw resources
  for (const resource of resources) {
    ctx.fillStyle = 'gold';
    ctx.beginPath();
    ctx.arc(resource.x, resource.y, 5, 0, 2 * Math.PI);
    ctx.fill();
  }
  // Draw players
  for (const id in players) {
    const p = players[id];
    if (!p.alive) continue;
    ctx.fillStyle = p.color || 'blue';
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
    ctx.fill();
    if (id === myId) {
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
}

draw();