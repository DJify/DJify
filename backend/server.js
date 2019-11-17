const express = require('express')
require('dotenv').config()

const loginRouter = require('./routers/loginRouter')
const concertRouter = require('./routers/concertRouter')
const userRouter = require('./routers/userRouter')
const trackRouter = require('./routers/trackRouter')

const app = express()

app.use('/login', loginRouter)
app.use('/concert', concertRouter)
app.use('/user', userRouter)
app.use('/track', trackRouter)

let port = process.env.PORT || 8888
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)