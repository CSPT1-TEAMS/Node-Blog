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

router.get('/:id', (req, res) => {
    const postId = req.params.id;
    userData.get(postId)
        .then(user => {
              // user is just a parameter that represents a response from the database
            if (user === undefined) {
                // return so it ends the function's execution immediately => other wise the next response will run
                return res.status(404).json({ error: "The user with the specified id does not exist." });
            }
            res.json({ user });
        })
        .catch(err => {
            // why is the wrong id giving me an empty object instead of the error message?
            res.status(500).json({ message: "Unable to retrieve user from database." });
        })
})

router.post('/', (req, res) => {
    userData.insert(req.body)
        .then(response => {
            res.status(201).json({ ...req.body, ...response });
        })
        .catch(err => response.status(500).json({ err }));
})

router.put('/:id', (req, res) => {
    userData.update(req.params.id, req.body)
        .then(response => {
            // res.status(200).json(req.body);
            userData.get(req.params.id)
                .then(response => {
                    res.json(response);
                })
                .catch(err => res.status(404).json({ err }))
        })
        .catch(err => res.status(500).json({ error: err.message }));
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    userData.remove(id)
        .then(response => {
            if (response === 0) {
                return res.status(404).json({ message: `User ${id} not found in database` })
            }
            res.status(200).json({ message: "===USER DELETED===" })
        })
        .catch(err => res.status(500).json({ err }))

})

module.exports = router;