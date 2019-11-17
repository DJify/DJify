const express = require('express')
const request = require('request')

const utils = require('./utils')

let searchRouter = express()

searchRouter.get('/', (req, res) => {
    let { searchQuery, access_token } = req.params
    console.log(req.params)
    searchQuery = searchQuery.replace(' ', '+')
    const extras = {
        qs: {
            q: searchQuery,
            type: 'track',
            limit: 12,
        },
    }
    const url = 'https://api.spotify.com/v1/search'
    const searchRequest = utils.buildSpotifyApiRequest(url, access_token, extras)

    request.get(searchRequest, (searchError, searchResponse, searchBody) => {
        console.log(searchBody)
    })
})