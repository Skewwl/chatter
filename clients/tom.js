const { io } = require('socket.io-client');
const client = io('ws://localhost:3000');
let Chance = require('chance');

let chance = new Chance();
let messageObject = {};
let room = 'catChat';
messageObject.message = chance.sentence();
messageObject.room = room;
let isGone = false;

function messageRecieved(payload) {
  console.log('message recieved: ', payload);
}

client.emit('roomName', room);
const intervalID = setInterval(() => {
  if (isGone) {clearInterval(intervalID)};
  client.emit('newMessage', messageObject);
}, 2500);
client.on('hereIsTheMessage', messageRecieved);

setTimeout(() => {
    setTimeout(() => {
        client.emit('leave', room);
    }, 3500);
    return isGone = true;
}, 6000);