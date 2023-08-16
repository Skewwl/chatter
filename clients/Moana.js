const { io } = require('socket.io-client');
const client = io('ws://localhost:3000');
let Chance = require('chance');

let chance = new Chance();
let message = chance.sentence();

client.emit('roomName', 'diabloFour');
client.emit('newMessage', message);