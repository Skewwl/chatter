'use strict';

const { Server } = require("socket.io");

//socket server instance
const io = new Server();
io.listen(3000);


function messageHandler(payload) {
    // console.log('message handler payload ', {payload});
    if (payload.room === 'diabloFour') {
      io.in('diabloFour').emit('hereIsTheMessage', payload.message);
      console.log(payload.message);
    }
    if (payload.room === 'catChat'){
        io.in('catChat').emit('hereIsTheMessage', payload.message);
        console.log(payload.message);
    }
};

function joinRoom(payload, socket) {
  socket.join(payload)
  io.in(payload).emit('roomJoined', 'Success!!!!!')
  console.log(`Room ${payload} joined!`);
//   console.log("We have a new connection: User " + socket.id);
}

function leaveRoom(payload, socket) {
    socket.leave(payload, console.log(`${socket.id} has left ${payload}`))
}

let userNumber = 0;
function handleConnection(socket) {
    userNumber++;
    console.log("We have a new connection: User " + userNumber);
    // console.log("We have a new connection: User " + socket.id);
    socket.on('roomName', (payload) => joinRoom(payload, socket));
    socket.on("newMessage", (payload) => messageHandler(payload));
    socket.on('leave', (payload) => leaveRoom(payload, socket));
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