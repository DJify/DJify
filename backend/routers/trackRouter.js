const express = require('express')
const request = require('request')
const querystring = require('querystring')

const Track = require('../schemas/track')
const utils = require('./utils')

let trackRouter = express()

trackRouter.route('/vote')
    .post((req, res) => {
        const { userId, trackId, isUpvote } = req.body
        const track = Track.findById(trackId, (err, res) => {
            const { upvoters, downvoters } = track
            if (isUpvote === true) {
                
            } else {
    
            }
        })
    })

trackRouter.route('/downvote')
    .post((req, res) => {
        const { userId, trackId } = req.body
    })

trackRouter.route('/save-song')
    .post((req, res) => {
        
    })

module.exports = trackRouter