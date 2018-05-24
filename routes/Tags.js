const express = require('express');
const tagRoutes = express();

const getTags = require('../data/helpers/tagDb.js');

tagRoutes.get('/', (req, res) => {

    getTags.get()
        .then( tags => {
            res.status(200).json({ tags });
        })
        .catch( err => {
            res.status(500).json({ err: "NOTHING MATE" });
        })
});

tagRoutes.get('/:id', (req, res) => {
    const { id } = req.params;

    getTags.get(id)
        .then( tags => {
            res.status(200).json({ tags });
        })
        .catch( err => {
            res.status(500).json({ err: "NOTHING MATE" });
        })
});


tagRoutes.post('/', (req, res) => {
    const { tag } = req.body;
    const tagPost = { tag };

    getTags.insert(tagPost)
        .then( tagPost => {
            res.status(200).json({ tagPost });
        })
        .catch( err => {
            res.status(500).json({ err: "NOTHING MATE" });
        })
});

tagRoutes.put('/:id', (req, res) => {
    const { id } = req.params;
    const { tag } = req.body;
    const tagContent = { tag };

    getTags.update(id, tagContent)
        .then( tagContent => {
            res.status(200).json({ tagContent });
        })
        .catch( err => {
            res.status(500).json({ err: "NOTHING MATE" });
        })
});

tagRoutes.delete('/:id', (req, res) => {
    const { id } = req.params;

    getTags.remove(id)
        .then( tag => {
            res.status(200).json({ tag })
        })
        .catch( err => {
            res.status(500).json({ err: "NOTHING MATE" });
        })
});

module.exports = tagRoutes;