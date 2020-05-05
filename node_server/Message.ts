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
