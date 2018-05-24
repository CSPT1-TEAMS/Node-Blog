const express = require('express');
const userRoutes = express();

const getUsers = require('./data/helpers/userDb.js');

userRoutes.get('/', (req, res) => {

    getPosts.get()
        .then( posts => {
            res.status(200).json({ posts });
        })
        .catch( err => {
            res.status(500).json({ err: "NOTHING MATE" });
        })
});

userRoutes.get('/:id', (req, res) => {
    const { id } = req.params;

    getPosts.get(id)
        .then( posts => {
            res.status(200).json({ posts });
        })
        .catch( err => {
            res.status(500).json({ err: "NOTHING MATE" });
        })
});


userRoutes.post('/', (req, res) => {
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

userRoutes.put('/:id', (req, res) => {
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

userRoutes.delete('/:id', (req, res) => {
    const { id } = req.params;

    getPosts.remove(id)
        .then( post => {
            res.status(200).json({ post })
        })
        .catch( err => {
            res.status(500).json({ err: "NOTHING MATE" });
        })
});

module.exports = userRoutes;