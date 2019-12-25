require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const expressWs = require('@small-tech/express-ws')(express())

const loginRouter = require('./routers/loginRouter')
const concertRouter = require('./routers/concertRouter')
const userRouter = require('./routers/userRouter')
const trackRouter = require('./routers/trackRouter')

const app = expressWs.app

app.use('/login', loginRouter)
app.use('/concert', concertRouter)
app.use('/user', userRouter)
app.use('/track', trackRouter)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(_ => console.log('Successfully Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB', err))

let port = process.env.PORT || 8888
console.log(
  `Listening on port ${port}. Go /login to initiate authentication flow.`
)
app.listen(port)
