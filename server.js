const express = require('express');
const logger = require('morgan');
const postRouter = require('./routes/Posts');
const tagRouter = require('./routes/Tags');
const server = express();
const port = 5000;

const getUsers = require('./data/helpers/userDb.js');

server.use(logger());
server.use(express.json());

server.use('/posts', postRouter);
server.use('/tags', tagRouter);

server.listen(port, () => {
    console.log(` === APP LISTENING IN ${port} === `);
});