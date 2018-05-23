const express = require('express')
const server = express()
const userRouter = require('./userRouter');
const tagRouter = require('./tagRouter');
const postRouter = require('./postRouter');

server.listen(3000,  () => {
    console.log('app is running on port 3000')
})

server.use(express.json())
server.use('/api/users', userRouter)
