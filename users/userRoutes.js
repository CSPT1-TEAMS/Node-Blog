const express = require('express');
const user = require('../data/helpers/userDb.js');
const logger = require('../middleware.js');

const router = express.Router();
router.use(express.json());

router.get('/', function (req, res) {
    user.get()
        .then(users => {
            res.json({ users })
        })
        .catch(error => {
            res.status(500).json({
                error: "The users could not be retrieved."
            })
        })
})

router.get('/:id', function (req, res) {
    const userId = req.params.id;
    const userFound = !req.params;
    user.get(userId)
        .then(user => {
            console.log('CODE', res.statusCode)
            if (user) {
                res.json({ user }) 
              }  else {
                return res.status(404).json({
                    message: "The user with the specified ID does not exist."
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "The post's information could not be retrieved."
            })
        })
})

router.get('/:id/posts', (req, res) => {
    user.getUserPosts(req.params.id)
    .then( response => {
        res.send(response);
    })
    .catch(err => {
        res.status(500);
    })
})


router.post('/', (req, res) => {
    const newUser = req.body;
    if (!newUser.name) {
        console.log('text', newUser.name);
        return res.status(400).json({
            errorMessage: "Please provide text and userId for the post."
        })
    }
    user.insert(newUser)
        .then(users => {
            res.status(201).json({ users });
        })
        .catch(err => {
            if (res.statusCode === 400) {
                res.status(400).json({
                    errorMessage: "Please provide a name."
                })
            } else {
                res.status(500).json({
                    error: "There was an error while saving the user to the database"
                })
            }
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let deleted;
    user.remove(id)
        .then(deleted => {
            console.log('CODE', res.statusCode)
            if (deleted) {
                res.status(201).json({ deleted })
            } else {
                return res.status(404).json({
                    message: "The user with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The tag could not be removed"
            })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    if (!updatedUser.name) {
        console.log('name', updatedUser.name);
        return res.status(400).json({
            errorMessage: "Please provide name for the user."
        })
    }
    user.update(id, updatedUser)
        .then((updated) => {
            if (updated === 1) {
                        console.log('user', user);
                        console.log('name', updated.name);
                        res.status(200).json({ updated });
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The user could not be modified"
            })
        });
});

module.exports = router;