const buildSpotifyApiRequest = (url, access_token, extras) => ({
    url,
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true,
    ...extras,
})

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

module.exports = {
    buildSpotifyApiRequest,
    ClientMessageTypes,
    ServerMessageTypes,
}