const express = require('express');
const userRoutes = express();

const getUsers = require('../data/helpers/userDb.js');

userRoutes.get('/', (req, res) => {

    getUsers.get()
        .then( users => {
            res.status(200).json({ users });
        })
        .catch( err => {
            res.status(500).json({ err: "ERROR MATE" });
        })
});

userRoutes.get('/:id', (req, res) => {
    const { id } = req.params;

    getUsers.get(id)
        getUsers.getUserPosts(id)
            .then( users => {
                res.status(200).json({ users });
            })
            .catch( err => {
                res.status(500).json({ err: "ERROR MATE" });
            })
});


userRoutes.post('/', (req, res) => {
    const { name } = req.body;
    const user = { name };

    getUsers.insert(user)
        .then( user => {
            res.status(200).json({ user });
        })
        .catch( err => {
            res.status(500).json({ err: "ERROR MATE" });
        })
});

userRoutes.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = { name };

    getUsers.update(id, user)
        .then( user => {
            res.status(200).json({ user });
        })
        .catch( err => {
            res.status(500).json({ err: "ERROR MATE" });
        })
});

userRoutes.delete('/:id', (req, res) => {
    const { id } = req.params;

    getUsers.remove(id)
        .then( user => {
            res.status(200).json({ user })
        })
        .catch( err => {
            res.status(500).json({ err: "ERROR MATE" });
        })
});

module.exports = userRoutes;