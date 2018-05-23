const express = require('express');
const router = express.Router();
const db = require('../seeds/03-posts.js');

router.get('/', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json({ posts })
    })
    .catch(err => {
        res.status(500).json({ error: "The posts could not be retrieved." })
    })
})

module.exports = router;