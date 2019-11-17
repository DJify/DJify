const express = require('express')
const request = require('request')

let searchRouter = express()

searchRouter.get('/', (req, res) => {
    const { searchQuery } = req.body
})