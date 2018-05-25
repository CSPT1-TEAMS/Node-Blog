const express = require('express')
const tagDb = require('../data/helpers/tagDb.js')

const router = express.Router()

router.get('/', (req, res) => {
    tagDb.get()
    .then(tags => {
      res.status(200).json(tags)
    })
    .catch(err => {
      res.status(500).json({error: "Error getting tags"})
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  tagDb.get(id)
    .then(tag => {
      res.status(200).json(tag)
    })
    .catch(err => {
      res.status(500).json({error: "Error finding tag id"})
    })
})

router.post('/', (req, res) => {

    let tag = req.body;
    // console.log(tag)
    if(tag['tag'].length > 80 )
        return res.status(400).json({error: "Tag was greater than 80 characters"})

    tagDb.insert(tag)
    .then(tags => {
        res.status(201).json(tags)
        
    })
    .catch(err => {
        res.status(500).json({error: "Error adding tag to database"})
    })
      

})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const updatedTag = req.body

    tagDb.update(id, updatedTag)
    .then(response => {
        res.status(200).json(updatedTag)
    })
    .catch(err => {
        res.status(500).json({error: "Error updating tag"})
    })

})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  tagDb.remove(id)
    .then(tag => {
      if (tag == 1) res.status(200).json({success: "Tag was deleted"})
      else res.status(404).json({ error: "Could not remove tag with that id"})
    })
    .catch(err => {
      res.status(500).json({error: "Error deleting tag"})
    })
})

module.exports = router