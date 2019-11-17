const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
    },
    queuedSongIds: {
        type: [String],
        required: true,
        default: [],
    },
    spotifyUserId: {
        type: String,
        required: true,
    },
    totalEncores: {
        type: Number,
        required: true,
        default: 0,
    },
    totalBoots: {
        type: Number,
        required: true,
        default: 0,
    },
    wantsToDj: {
        type: Boolean,
        required: true,
        default: true,
    },
    spotifyControlsEnabled: {
        type: Boolean,
        required: true,
        default: true,
    },
    avatarId: {
        type: Number,
        required: true,
        default: 0,
    }
})

module.exports = mongoose.model('User', userSchema)
