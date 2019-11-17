const express = require('express')
const request = require('request')
const querystring = require('querystring')

const Concert = require('../schemas/concert')
const User = require('../schemas/user')
const utils = require('./utils')

let concertRouter = express()

concertRouter.route('/')
    .get((req, res) => {
        const x = Concert.aggregate([
            {
                $group: {_id: "$categoryId" }
            }
        ])
        console.log(x)
    })
    .post((req, res) => {
        const { spotifyUserId, concertName, category } = req.body

        const createPlaylistRequest = {
            url: `https://api.spotify.com/v1/users/${spotifyUserId}/playlists`,
            headers: {
                'Authorization': 'Bearer ' + access_token,
            },
            body: {
                name: `${concertName} ${Date.now}`,
                public: true,
                collaborative: true,
            },
            json: true,
        }

        request.post(createPlaylistRequest, (playlistError, playlistResponse, playlistBody) => {
            const playlistId = playlistBody.id
            const concert = Concert({
                name: concertName,
                playlistId,
                category,
                users: [userId],
                djs: [userId],
            })
            concert.save(() => {
                let redirectUrl = process.env.FRONTEND_URI || 'localhost:3000'
                redirectUrl += '/room'
                res.redirect(redirectUrl)
            })
        })
    })

concertRouter.route('/join')
    .post((req, res) => {
        const { userId, concertId, songId } = req.body
        const curUser = User.findById(userId)
        const curConcert = Concert.findById(concertId)
        const curTime = Date.now - curConcert.startTime

        const createMediaRequest = {
            url: `https://api.spotify.com/v1/me/player/play`,
            headers: {
                'Authorization': 'Bearer ' + access_token,
            },
            body: {
                context_uri: curConcert.playlistId,
                position_ms: curTime,
            },
            json: true,
        }

        curConcert.users.push(curUser);
        curConcert.save(() => {
            let redirectUrl = process.env.FRONTEND_URI || 'localhost:3000'
            redirectUrl += '/room'
            res.redirect(redirectUrl)
        })
    })

concertRouter.route('/leave')
    .post((req, res) => {
        const { userId, concertId } = req.body
        const curUser = User.findById(userId)
        const curConcert = Concert.findById(concertId)

        curConcert.users.remove(curUser);
        curConcert.save(() => {
            let redirectUrl = process.env.FRONTEND_URI || 'localhost:3000'
            redirectUrl += '/dashboard'
            res.redirect(redirectUrl)
        })
    })

concertRouter.route('/vote')
    .post((req, res) => {
        const { userId, concertId, vote } = req.body
    })

concertRouter.route('/downvote')
    .post((req, res) => {
        const { userId, concertId } = req.body
    })

concertRouter.route('/save-song')
    .post((req, res) => {
    })

concertRouter.route('/category/:categoryId')
    .get((req, res) => {

    })

module.exports = concertRouter
