class User {
    socket_id: String;  //empty if not connected
    user_id: String;
    username: String;
    private _messages: Array<Message>;
    last_online: number; //contains the unix timestamp of which the user last logged out

    constructor(socket_id: String, user_id: String, username: String) {
        this.socket_id = socket_id;
        this.user_id = user_id;
        this.username = username;
        this.last_online = 0;
        this._messages = new Array<Message>()
    }

    get messages(): Array<Message> {
        return this._messages;
    }

    set addMessage(value: Message) {
        this._messages.push(value);
    }
}
