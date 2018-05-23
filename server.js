const express = require('express');
const logger = require('morgan');
const server = express();
const port = 5000;

const getPosts = require('./data/helpers/postDb.js');
const getTags = require('./data/helpers/tagDb.js');
const getUsers = require('./data/helpers/userDb.js');

server.use(logger());
server.use(express.json());

server.get('/posts', (req, res) => {
    getPosts.get()
        .then( posts => {
            res.status(200).json({ posts });
        })
        .catch( err => {
            res.status(500).json({ err: "NOTHING MATE" });
        })
});

server.get('/posts/:id', (req, res) => {
    const { id } = req.params;

    getPosts.get(id)
        .then( posts => {
            res.status(200).json({ posts });
        })
        .catch( err => {
            res.status(500).json({ err: "NOTHING MATE" });
        })
});

server.get('/tags', (req, res) => {
    getTags.get()
        .then( tags => {
            res.status(200).json({ tags });
        })
        .catch( err => {
            res.status(500).json({ err: "NOTHING MATE" });
        })
});

server.get('/users', (req, res) => {
    getUsers.get()
        .then( users => {
            res.status(200).json({ users });
        })
        .catch( err => {
            res.status(500).json({ err: "NOTHING MATE" });
        })
});



server.listen(port, () => {
    console.log(` === APP LISTENING IN ${port} === `);
});