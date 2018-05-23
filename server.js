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


server.post('/posts', (req, res) => {
    const { text, userId } = req.body;
    const content = { text, userId };

    getPosts.insert(content)
        .then( content => {
            res.status(200).json({ content });
        })
        .catch( err => {
            res.status(500).json({ err: "NOTHING MATE" });
        })
});

server.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const post = { text };

    getPosts.update(id, post)
        .then( post => {
            res.status(200).json({ post });
        })
        .catch( err => {
            res.status(500).json({ err: "NOTHING MATE" });
        })
});

server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;

    getPosts.remove(id)
        .then( post => {
            res.status(200).json({ post })
        })
        .catch( err => {
            res.status(500).json({ err: "NOTHING MATE" });
        })
});


server.listen(port, () => {
    console.log(` === APP LISTENING IN ${port} === `);
});