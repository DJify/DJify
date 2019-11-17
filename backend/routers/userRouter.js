const express = require('express')
const request = require('request')

const User = require('../schemas/user')
const utils = require('./utils')
const frontendUri = process.env.FRONTEND_URI || 'http://localhost:3000'

const userRouter = express.Router();

userRouter.route('/')
    .post((req, res) => {
        const { spotifyUserId, wantsToDj, username, avatarId } = req.body
        const user = User({ spotifyUserId, wantsToDj, username, avatarId })
        user.save(() => {
            res.redirect(frontendUri + '/dashboard')
        })
    })

userRouter.route('/:userId')

userRouter.route('/playlists')
    .get((req, res) => {
        const { access_token } = req.params
        const spotifyUrl = 'https://api.spotify.com/v1/me/playlists'
        const playlistRequest = utils.buildSpotifyApiRequest(spotifyUrl, access_token)

        request.get(playlistRequest, (error, response, body) => {
            res.json(body)
        })
    })

module.exports = userRouter