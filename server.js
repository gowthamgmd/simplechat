const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*" } // Allow all connections (important for different tabs)
});

app.get("/", (req, res) => {
    res.send("Real-Time Chat Server Running...");
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("sendMessage", (message) => {
        console.log("Message received:", message);
        io.emit("receiveMessage", message); // Broadcast to all clients
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(3000, () => console.log("Server running on port 3000"));