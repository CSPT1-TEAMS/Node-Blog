const express = require('express');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');
const router = express.Router();

router.get('/', (req, res) => {
    postDb.get()
        .then(posts => {
            res.json({ posts })
        })
        .catch(error => {
            res.status(500).json({
                error: "The posts information could not be retrieved."
            })
        })
})

router.get('/:id', (req, res) => {
    const postId = req.params.id;
    postDb.get(postId)
        .then(posts => {
            //some logic here if postId not found, 404
            res.json({ posts })
        })
        .catch(error => {
            res.status(500).json({
                error: "The posts information could not be retrieved."
            })
        })
})

module.exports = router;