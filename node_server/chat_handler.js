let users = []


let userObject = {
    socket_id: "",
    user_id: "",
    username: ""
}

module.exports = {
    initChat: function (io) {
        io.on('connection', (socket) => {
            socket.on('new-connection', (data) => {
                users.push()
            })

            socket.on('chat message', (msg) => {
                io.emit('chat message', msg)
            });
        });
    }
}


//io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });
