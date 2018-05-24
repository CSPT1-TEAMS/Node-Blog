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
          res.json({ user });
      })
      .catch(err => {
          // why is the wrong id giving me an empty object instead of the error message?
          res.status(404).json({ error: "The user with the specified id does not exist." });
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
    // okay so the put request is working but hanging...I have to hit 
    // cancel request in Postman but the thing is actually updated. Why?
    userData.update(req.params.id, req.body)
        .then(response => {
            // res.status(200).json(req.body);
            db.findById(req.params.id)
              .then(response => {
                  res.json(response);
              })
              .catch(err => res.status(404).json({ err }))
        })
        .catch(err => response.status(500).json({ error: "The post information could not be modified." }));
})

module.exports = router;