const mongoose = require('mongoose')
const User = require('./user').schema

const trackSchema = mongoose.Schema({
    startTime: {
        type: Date,
        default: Date.now,
    },
    upvoters: {
        type: [User],
        default: [],
    },
    downvoters: {
        type: [User],
        default: [],
    },
    isEncore: {
        type: Boolean,
        default: false,
    },
    queuedBy: {
        type: User,
        required: true,
    },
    spotifyTrackId: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Track', trackSchema)