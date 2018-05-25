const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const postRouter = require('./routes/Posts');
const tagRouter = require('./routes/Tags');
const userRouter = require('./routes/Users');

const server = express();
const port = 5000;

server.use(helmet());
server.use(express.json());
server.use(helmet.hidePoweredBy());
// server.use(logger());

server.use('/posts', postRouter);
server.use('/tags', tagRouter);
server.use('/users', userRouter);

server.listen(port, () => {
    console.log(` === APP LISTENING IN ${port} === `);
});