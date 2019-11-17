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

module.exports = userRouter