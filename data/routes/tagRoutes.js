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

router.get('/:id', (req, res) => {
    const postId = req.params.id;
    tagData.get(postId)
      .then(tag => {
          res.json({ tag });
      })
      .catch(err => {
          // why is the wrong id giving me an empty object instead of the error message?
          res.status(404).json({ error: "The user with the specified id does not exist." });
      })
})

router.post('/', (req, res) => {
    tagData.insert(req.body)
        .then(response => {
            res.status(201).json({ ...req.body, ...response });
        })
        .catch(err => response.status(500).json({ err }));
})

router.put('/:id', (req, res) => {
    tagData.update(req.params.id, req.body)
        .then(response => {
            // res.status(200).json(req.body);
            db.findById(req.params.id)
              .then(response => {
                  res.json(response);
              })
              .catch(err => res.status(404).json({ err }))
        })
        .catch(err => response.status(500).json({ error: "The tag information could not be modified." }));
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    tagData.get(id)
        .then(foundTag => {
            tagData.remove(id)
                .then(response => {
                    res.status(200).json({ message: "===TAG DELETED===" })
                })
        })
        .catch(err => response.status(500).json({ err }))
})
module.exports = router;