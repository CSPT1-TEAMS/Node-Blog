const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const tagRoutes = require('./routes/tagRoutes')

const server = express();

server.use(cors());
server.use(express.json())


server.use('/api/posts', postRoutes)
// server.use('/api/users', userRoutes)
// server.use('/api/tags/', tagRoutes)

server.listen(5005, () => {
    console.log("API Running on port 5005")
})