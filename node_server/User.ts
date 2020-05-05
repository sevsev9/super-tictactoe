class User {
    socket_id: String;
    user_id: String;
    username: String;
    private _messages: Array<Message>;

    constructor(socket_id: String, user_id: String, username: String) {
        this.socket_id = socket_id;
        this.user_id = user_id;
        this.username = username;
        this._messages = new Array<Message>()
    }


    get messages(): Array<Message> {
        return this._messages;
    }


    set addMessage(value: Message) {
        this._messages.push(value);
    }
}
