const express = require('express')
const request = require('request')
const querystring = require('querystring')

const utils = require('./utils')

let categoryRouter = express()

categoryRouter.get('/', (req, res) => {
    const { accessToken } = req.params
    const extras = {
        limit: 20
    }
    const spotifyCategoryRequest = utils.buildSpotifyApiRequest('https://api.spotify.com/v1/browse/categories', accessToken, extras)

    request.get(spotifyCategoryRequest, (error, response, body) => {
        let categoriesToReturn = []
        body.categories.forEach(category => {
            categoriesToReturn.push({
                [category.id]: category.name,
            })
        });
        res.json(categories)
    })
})

module.exports = categoryRouter