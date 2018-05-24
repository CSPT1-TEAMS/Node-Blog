const express = require('express');
const router = express.Router();
const postData = require('../helpers/postDb');

router.get('/', (req, res) => {
    postData.get()
    .then(posts => {
        res.status(200).json({ posts })
    })
    .catch(err => {
        res.status(500).json({ error: "The posts could not be retrieved." })
    })
})

router.get('/:id', (req, res) => {
    const postId = req.params.id;
    postData.get(postId)
      .then(post => {
          res.json({ post });
      })
      .catch(err => {
          // why is the wrong id giving me an empty object instead of the error message?
          res.status(404).json({ error: "The user with the specified id does not exist." });
      })
})

router.post('/', (req, res) => {
    postData.insert(req.body)
        .then(response => {
            res.status(201).json({ ...req.body, ...response });
        })
        .catch(err => response.status(500).json({ err }));
})

router.put('/:id', (req, res) => {
    postData.update(req.params.id, req.body)
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

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    postData.get(id)
        .then(foundPost => {
            postData.remove(id)
                .then(response => {
                    res.status(200).json({ message: "===POST DELETED===" })
                })
        })
        .catch(err => response.status(500).json({ err }))
})

module.exports = router;