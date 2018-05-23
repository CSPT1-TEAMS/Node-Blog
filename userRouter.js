const express = require('express')
const router = express.Router()
const db = require('./data/helpers/userDb')

router.get("/", (req, res, next) => {
    db.get()
    .then(users => {
        res.status(200).json(users);
    })
})

router.get("/:id", (req, res, next) => {
    const { id } = req.params;
    db.get(id)
    .then(user => {
        res.status(200).json(user);
    })
})

router.post("/", (req, res, next) => {
    const name = req.body;
    db.insert(name)
    .then(id => {
        res.status(200).json(id);
    })
    .catch(err => {
        res.status(500).json({ error: "PROBLEM RETRIEVING DATA" })
    })
})

router.delete("/:id", (req, res, next) => {
    const { id } = req.params;
    db.remove(id)
    .then(count => {
        res.status(200).json(count);
    })
})

module.exports = router