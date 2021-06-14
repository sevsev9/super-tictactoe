var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const {initIndex} = require("./file_handler");
const {initChat} = require("./chat_handler");

initChat(io)
initIndex(app)


http.listen(3000, () => {
    console.log('listening on *:3000');
});
