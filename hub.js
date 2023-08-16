'use strict';

const { Server } = require("socket.io");

//socket server instance
const io = new Server();
io.listen(3000);

function newMessageHandler(payload) {
    io.to('diabloFour').emit(payload);
    console.log(payload);
}

function joinRoom(payload, socket) {
  socket.join(payload)
  console.log(`Room ${payload} joined!`);
}

let userNumber = 0;
function handleConnection(socket) {
    userNumber++;
    console.log("We have a new connection: User " + userNumber);
    socket.on('roomName', (payload) => joinRoom(payload, socket));
    socket.on("newMessage", newMessageHandler);
}

function startSocketServer() {
    console.log("The Socket Server has started!");
    // connection in a sense is a magic word than knows to react or listen to any client connect made. A socket obj will be passed on connection.
    io.on("connection", handleConnection);
}

  module.exports = {
    startSocketServer,
    Server,
  }