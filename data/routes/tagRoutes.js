const express = require('express');
const router = express.Router();
const tagData = require('../helpers/tagDb');

router.get('/', (req, res) => {
    tagData.get()
    .then(tags => {
        res.status(200).json({ tags })
    })
    .catch(err => {
        res.status(500).json({ error: "The posts could not be retrieved." })
    })
})

module.exports = router;