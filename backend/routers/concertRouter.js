const express = require('express')
const request = require('request')
const mongoose = require('mongoose')
const querystring = require('querystring')

const Concert = require('../schemas/concert')
const User = require('../schemas/user')
const utils = require('./utils')

const concertRouter = express.Router()
const { ClientMessageTypes, ServerMessageTypes } = utils

const RoomSchema = mongoose.Schema({
  name: String,
  djUserId: String,
  avatarId: Number,
  genre: String,
  userIds: [String],
  upvoterIds: [String],
  downvoterIds: [String],
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
            roomId: '$_id',
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

const handleJoin = async (payload, roomId, client) => {
  try {
    const { userId } = payload

    // save the userId corresponding with this client so we can access it later
    client.userId = userId

    const room = await Room.findById(roomId)
    console.log(`users before join: ${room.userIds}`)
  
    room.userIds.push(userId)
    await room.save()

    const roomAfter = await Room.findById(roomId)
    console.log(`users after join: ${roomAfter.userIds}`)
  } catch(err) {
    console.log(`Error in handleJoin: ${err.message}`)
    sendWebsocketMessage(client, ServerMessageTypes.ERROR, { message: 'Failed to join room.' })
  }
}

const handleLeave = async (roomId, userId) => {
  let room = await Room.findById(roomId)
  console.log(`users before leave: ${room.userIds}`)

  await Room.updateOne(
    { _id: roomId },
    { 
      $pull: { 
        userIds: userId,
        upvoterIds: userId,
        downvoterIds: userId,
      } 
    }
  )

  room = await Room.findById(roomId)
  console.log(`users after leave: ${room.userIds}`)
}

const handleVote = (payload, roomId, isUpvote) => {
  if (isUpvote === true) {
    // do the upvote
  } else {
    // do the downvote
  }
}

const handleUpvote = (payload, roomId, client) => {
  handleVote(client, payload, roomId, client, true)
}

const handleDownvote = (payload, roomId, client) => {
  handleVote(client, payload, roomId, client, false)
}

// map the message type to an appropriate handler
const messageTypeToHandler = {
  [ClientMessageTypes.JOIN_ROOM]: handleJoin,
  [ClientMessageTypes.UPVOTE]: handleUpvote,
  [ClientMessageTypes.DOWNVOTE]: handleDownvote,
}

const sendWebsocketMessage = (client, messageType, rest) => {
  const message = JSON.stringify({
    type: messageType,
    ...rest
  })
  client.send(message)
}

function webSocketHandler(client, request) {
  const { roomId } = request.params
  client.room = this.setRoom(request)
  console.log(`New client connected to ${client.room}`)

  client.on('message', async (message) => {
    console.log(`message:`)
    console.log(message)
    const payload = JSON.parse(message)
    const { type } = payload

    const handler = messageTypeToHandler[type]
    if (handler === undefined) {
      console.log(`Handler for message type: '${type}' not implemented`)
      sendWebsocketMessage(client, ServerMessageTypes.ERROR, { message: 'Request unsuccessful.' })
    }

    // handlers should only return a broadcastMessage if they want to send an update to all other clients
    const broadcastMessage = await handler(payload, roomId, client)
    if (broadcastMessage) {
      const numberOfRecipients = this.broadcast(client, broadcastMessage, { skipSelf: false })
      console.log(`${client.room} message broadcast to ${numberOfRecipients} recipient${numberOfRecipients === 1 ? '' : 's'}.`)
    } 
  })

  client.on('close', () => {
    if (client && client.userId) {
      handleLeave(roomId, client.userId)
    }
  })
} 

concertRouter.ws('/:roomId', webSocketHandler)

module.exports = concertRouter
