let users = []
let online_users =  new Map() //contains map entry -> [socketid, user]



/**
 * @returns The user if it is in the list, otherwise null.
 * */
function findUser(username) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            return users[i]
        }
    }
    return null
}

module.exports = {
    initChat: function (io) {
        io.on('connection', (socket) => {
            socket.on('new-connection', (data) => {
                if (data.user_id !== undefined && data.username !== undefined) {
                    let user = new User(socket.id, data.user_id, data.username)
                    users.push(user)
                    online_users.set(socket.id, user)
                } else {
                    socket.emit('no-user-error')
                    socket.disconnect()
                }
            })

            socket.on('disconnect', (data) => {
                console.log(data)
                let user = online_users.get(socket.id)
                if (user !== undefined) {
                    user.socket_id = ""
                }
                online_users.delete(socket.id)
            })

            socket.on('chat message', (msg) => {
                if (msg.to !== undefined && msg.content !== undefined) {
                    if (msg.to.room_name !== undefined) {
                        if (msg.to.room_name === "general") {
                            io.emit({user: online_users.get(socket.id).user.username, message: msg})
                        }
                    } else if (msg.to.username !== undefined) {
                        let user = findUser(msg.to.username)
                        if (user === null) {
                            socket.emit('user-not-found')
                        } else if (user.socket_id === "") {
                            socket.emit('user-not-online')
                        } else {
                            socket.to(user.socket_id).emit('chat message', {from: user.username, content: msg.content})
                        }
                    }
                }
            });

        });

    }
}
