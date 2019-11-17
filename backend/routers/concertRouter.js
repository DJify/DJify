const express = require('express')
const request = require('request')
const mongoose = require('mongoose')
const querystring = require('querystring')

const Concert = require('../schemas/concert')
const User = require('../schemas/user')
const utils = require('./utils')

let concertRouter = express.Router()

const RoomSchema = mongoose.Schema({
  name: String,
  djUserId: String,
  avatarId: Number,
  genre: String,
})

const Room = mongoose.model('Room', RoomSchema)

concertRouter.get('/', (req, res) => {
  Room.aggregate([
    {
      $group: {
        _id: '$genre',
        rooms: {
          $push: {
            name: '$name',
            avatarId: '$avatarId',
            djUserId: '$djUserId',
          },
        },
      },
    },
  ]).then(roomsByGenre => res.send({ roomsByGenre }))
})

concertRouter.post('/', (req, res) => {
  const { djUserId, avatarId, roomName, genre } = req.query

  const newRoom = new Room({
    djUserId,
    avatarId,
    genre,
    name: roomName,
  })
  newRoom
    .save()
    .then(saved => res.send({ newRoom: saved }))
    .catch(err => res.sendStatus(400))
})

concertRouter.post('/choosePlaylist', (req, res) => {
  const { currentSongId, roomGenre, roomName, djUserId } = req.query
  Room.findOneAndUpdate(
    { genre: roomGenre, name: roomName, djUserId: djUserId },
    {
      $set: { currentSongId },
    }
  )
})

concertRouter.route('/join').post((req, res) => {
  const { userId, concertId, songId } = req.body
  const curUser = User.findById(userId)
  const curConcert = Concert.findById(concertId)
  const curTime = Date.now - curConcert.startTime

  const createMediaRequest = {
    url: `https://api.spotify.com/v1/me/player/play`,
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
    body: {
      context_uri: curConcert.playlistId,
      position_ms: curTime,
    },
    json: true,
  }

  curConcert.users.push(curUser)
  curConcert.save(() => {
    let redirectUrl = process.env.FRONTEND_URI || 'localhost:3000'
    redirectUrl += '/room'
    res.redirect(redirectUrl)
  })
})

concertRouter.route('/leave').post((req, res) => {
  const { userId, concertId } = req.body
  const curUser = User.findById(userId)
  const curConcert = Concert.findById(concertId)

  curConcert.users.remove(curUser)
  curConcert.save(() => {
    let redirectUrl = process.env.FRONTEND_URI || 'localhost:3000'
    redirectUrl += '/dashboard'
    res.redirect(redirectUrl)
  })
})

concertRouter.route('/vote').post((req, res) => {
  const { userId, concertId, vote } = req.body
})

concertRouter.route('/downvote').post((req, res) => {
  const { userId, concertId } = req.body
})

concertRouter.route('/save-song').post((req, res) => {})

concertRouter.route('/category/:categoryId').get((req, res) => {})

module.exports = concertRouter
