# Polka Dots Game

A simple real-time multiplayer top-down “polka dots” bumper game.

## Features

- Move your dot with the mouse
- Gather resources to grow
- Bump other dots to make them lose resources
- Real-time multiplayer with Socket.io

## Stack

- **Frontend:** HTML5 Canvas + JavaScript
- **Backend:** Node.js + Socket.io

## Getting Started

### 1. Install dependencies

```
cd backend
npm install express socket.io
```

### 2. Run the backend

```
node server.js
```

### 3. Open the frontend

Open `frontend/index.html` in your browser.  
Ensure the backend is running at `http://localhost:3000`.

## Next Steps

- Implement resource collection & collision logic in `server.js`
- Improve movement, add defeat logic, UI polish, etc.

---

Enjoy coding your game!