import { w3cwebsocket as W3CWebSocket } from "websocket";

const ClientMessageTypes = Object.freeze({
    JOIN_ROOM: 'JOIN_ROOM',
    LEAVE_ROOM: 'LEAVE_ROOM',
    UPVOTE: 'UPVOTE_CURRENT_SONG',
    DOWNVOTE: 'DOWNVOTE_CURRENT_SONG',
    UPDATED_SONG_QUEUE: 'UPDATED_SONG_QUEUE',
})

const ServerMessageTypes = Object.freeze({
    UPDATE_VOTE_PERCENT: 'UPDATE_PERCENT_VOTE',
    UPDATE_USER_DJ_STATUS: 'UPDATE_USER_DJ_STATUS',
    UPDATE_CUR_SONG: 'UPDATE_CUR_SONG',
    ERROR: 'ERROR',
})

export class WebsocketClient {
    constructor(url, userId, serverMessageHandler) {
        console.log(url)
        this._client = new W3CWebSocket(url)
        this._userId = userId

        this._client.onopen = () => {
            console.log('Websocket connection created')
            this._joinRoom()
        }
        this._client.onmessage = serverMessageHandler

    }

    _sendMessage(type, rest) {
        const message = JSON.stringify({
            userId: this._userId,
            type,
            ...rest,
        })
        this._client.send(message)
    }

    _joinRoom() {
        this._sendMessage(ClientMessageTypes.JOIN_ROOM)
    }

    leaveRoom() {
        this._sendMessage(ClientMessageTypes.LEAVE_ROOM)
    }

    upvoteCurrentSong() {
        this._sendMessage(ClientMessageTypes.UPVOTE_CURRENT_SONG)
    }

    downvoteCurrentSong() {
        this._sendMessage(ClientMessageTypes.DOWNVOTE_CURRENT_SONG)
    }

    updateDjQueue(songIds) {
        this._sendMessage(ClientMessageTypes.UPDATED_SONG_QUEUE, { songIds })
    }

    close() {
        this._client.close()
    }
}