const express = require('express');
const router = express.Router();
const userData = require('../helpers/userDb');


router.get('/', (req, res) => {
    userData.get()
    .then(users => {
        res.status(200).json({ users })
    })
    .catch(err => {
        res.status(500).json({ error: "The posts could not be retrieved." })
    })
})

module.exports = router;