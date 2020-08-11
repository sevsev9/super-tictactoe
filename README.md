# super-tictactoe
[Super Tic Tac Toe Project](https://www.supertictactoe.co)

By
- [Sev](https://github.com/sevsev9)

## Mechanics
Incorporating vuex state management
Incorporating vue-router site management
Incorporating socket.io for event driven live communication

// Sample: - (mechanic name) [priority (low-high) 0-100]

- Login
  - Firebase OAuth
  - E-Mail
- Register
  - Firebase OAuth
  - E-Mail
- Game
  - Multiplayer
  - Player Search
    - Rank Matching
    - Seperate Service (Any backend language really)
    - IPs Stored in list on Backend
    - One Click Only mechanism to prevent ip scraping
  - VS Ai
- Ranking
- Arena Skins
- Circles and Crosses Skins
- Playing for Ingame Value?
  - Maby like real money
- Tournaments?


## Resources
### Socket.io
- [socket.io cheatsheet](https://socket.io/docs/emit-cheatsheet/)


## Documentation
### User
#### Server side
#### Protocols
##### Init Protocol
The init protocol serves the purpose of initializing the connection between the client and the server.
Here the client will emit the `new-connection` event once the socket is connected.
This event will contain an object which contains the username and the user id of the client connecting to the server.

Javascript Object:
```
data: {
    username: String,
    user_id: String
}
```

Once connected the server will check the if the user is already existent in the `users` array.
If it is already existent it will set the `socket_id` field to the socket id of the connected user and add a reference in the `online_users` map, where the key is the socket_id of the connected user.

Should the user not be already contained in the `users` array, the server will create a new user object and push it into the users map.

##### Receive Message from Client
The Listener is set to the name `new message`. When a new message is received from the client socket it contains only a string.
This string is then taken from the server and a new message object is created. Furthermore the message will be sent to the dedicated channel (socket id, room, etc.)

```
{
    to: Object,
    content: String
}
```

To specify where this message is destined to go the field to contains a `Object` which determines the forwarding.
This object can either contain one of the following:
```
{
    user_id: String,
    username: String,
    socket_id: String,
    room_name: String
}
```

The server will then act accordingly and foreward the message.



#### Datamodel
##### User
A user object consists of a `username`, `user_id`, and the `socket_id` over which the user is connected to a service.
Furthermore it includes all messages this specific user has sent.

Here it is important to note, should the user not be connected the socket_id does only contain an empty `String`: "".

To show when the user was last online the field `last_online` contains a unix timestamp when the user last logged out.

This timestamp will be updated once the connection to this socket will be closed.

Typescript Class:
```
class User {
    socket_id: String;  //empty if not connected
    user_id: String;
    username: String;
    private _messages: Array<Message>;
    last_online: number; //contains the unix timestamp of which the user was last online

    constructor(socket_id: String, user_id: String, username: String, last_online: number) {
        this.socket_id = socket_id;
        this.user_id = user_id;
        this.username = username;
        this.last_online = last_online;
        this._messages = new Array<Message>()
    }

    get messages(): Array<Message> {
        return this._messages;
    }


    set addMessage(value: Message) {
        this._messages.push(value);
    }
}
```

- Addons for later implementation:
  - User Rank
  - Games Played
  - Backgroud Image Path
  - Profile Image Path
  - Friends List
##### Message
The message object includes the following fields:
- `_message_id` -> The message id is a uniqe `number` containing the number of the message
- `_sent_from` -> This is the field which contains a reference to the User object it was sent to
- `_content` -> Contains the content of the message.
- `_timestamp` -> Contains the timestamp the message was received by the server.
- `_to` -> contains either the socked id or the specific room it was sent to.

Typescript Class:
```
///<reference path="User.ts"/>
class Message {
    private readonly _message_id: number;
    private readonly _sent_from: User;
    private readonly _content: String;
    private readonly _timestamp: String;
    private readonly _to: String;   //contains either the socked id or the specific room it was sent to

    constructor(message_id: number, sent_from: User, content: String, timestamp: String, to: String) {
        this._message_id = message_id;
        this._sent_from = sent_from;
        this._content = content;
        this._timestamp = timestamp;
        this._to = to;
    }

    get message_id(): number {
        return this._message_id;
    }

    get sent_from(): User {
        return this._sent_from;
    }

    get content(): String {
        return this._content;
    }

    get timestamp(): String {
        return this._timestamp;
    }
}
```
