const express = require('express')
const db = require('../data/helpers/postDb.js')

const router = express.Router()

router.get('/', (req, res) => {
  db.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({error: "Error getting posts"})
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  db.get(id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({error: "Error finding post id"})
    })
})

router.get('/:id/tags', (req, res) => {
  const { id } = req.params;
  
  db.getPostTags(id)
    .then(tags => {
      if (tags.length === 0) {
        res.status(404).json({error: "No tags found for this post"})
      } else{
        res.status(200).json(tags)
      }
    })
    .catch(err => {
      res.status(500).json({error: "Error finding tags for post"})
    })
})

router.post('/', (req, res) => {
  const { userId, text } = req.body;
  const post = { userId, text }

  if (userId == undefined || text == undefined) {
    return res.status(400).json({error: "Post must contain valid userId and text"})
  }
  db.get(userId)
    .then(user => {
      db.insert(post)
        .then(post => {
          res.status(201).json(post)
        })
        .catch(err => {
          res.status(500).json({error: "Error creating post"})
        })
    })
    .catch(err => {
      res.status(500).json({error: "Error finding user with that id"})
    })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { userId, text } = req.body;
  const updatedPost = { userId, text };

  if (userId == undefined || text === undefined) {
    return res.status(400).json({error: "Post must contain valid userId and text"})
  }       
  db.get(userId)
    .then(user => {
      db.update(id, updatedPost)
        .then(post => {
          if (post == 1) res.status(200).json({success: "Post was updated"})
          else res.status(500).json({error: "There was an error updating post"})
        })
    })
    .catch(err => {
      res.status(400).json({error: "userId was not found"})
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  db.remove(id)
    .then(post => {
      if (post == 1) res.status(200).json({success: "Post was deleted"})
      else res.status(404).json({ error: "Could not remove post with that id"})
    })
    .catch(err => {
      res.status(500).json({error: "Error deleting post"})
    })
})

module.exports = router