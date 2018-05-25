const express = require('express');
const postRoutes = express();

const getPosts = require('../data/helpers/postDb.js');

postRoutes.get('/', (req, res) => {

    getPosts.get()
        .then( posts => {
            res.status(200).json({ posts });
        })
        .catch( err => {
            res.status(500).json({ err: "NOTHING MATE" });
        })
});

postRoutes.get('/:id', (req, res) => {
    const { id } = req.params;

    getPosts.get(id)

        .then( posts => {
            res.status(200).json({ posts });
        })
        .catch( err => {
            res.status(500).json({ err: "ERROR MATE" });
        })
});

postRoutes.get('/:id/tags', (req, res) => {
    const { id } = req.params;

    getPosts.getPostTags(id)
        .then( tags => {
            res.status(200).json({ tags });
        })
        .catch(err => {
            res.status(500).json({ err: "ERROR MATE" });
        })
});


postRoutes.post('/', (req, res) => {
    const { text, userId } = req.body;
    const content = { text, userId };

    getPosts.insert(content)
        .then( content => {
            res.status(200).json({ content });
        })
        .catch( err => {
            res.status(500).json({ err: "ERROR MATE" });
        })
});

postRoutes.put('/:id', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const post = { text };

    getPosts.update(id, post)
        .then( post => {
            res.status(200).json({ post });
        })
        .catch( err => {
            res.status(500).json({ err: "ERROR MATE" });
        })
});

postRoutes.delete('/:id', (req, res) => {
    const { id } = req.params;

    getPosts.remove(id)
        .then( post => {
            res.status(200).json({ post })
        })
        .catch( err => {
            res.status(500).json({ err: "ERROR MATE" });
        })
});

module.exports = postRoutes;