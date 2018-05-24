const express = require('express');

const tag = require('./data/helpers/tagDb.js');
const user = require('./data/helpers/userDb.js');

const cors = require('cors');
const helmet = require('helmet');
const server = express();
const router = express.Router();

const userRoutes = require('./userRoutes');
const { logger, greeter } = require('./middleware.js')
server.listen(5000, () => {
    console.log('=== APP running on port 5000 ===')
})

//add middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger('loading'));


//use route handlers

server.use('/api/posts', userRoutes);

// server.use('/api/posts/:id', userRoutes)
module.exports = server;
