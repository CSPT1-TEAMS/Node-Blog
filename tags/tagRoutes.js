const express = require('express');
const tag = require('../data/helpers/tagDb.js');
const logger = require('../middleware.js');

const router = express.Router();
router.use(express.json());

router.get('/', function (req, res) {
    tag.get()
        .then(tags => {
            res.json({ tags })
        })
        .catch(error => {
            res.status(500).json({
                error: "The tags could not be retrieved."
            })
        })
})



router.get('/:id', function (req, res) {
    const tagId = req.params.id;
    const tagFound = !req.params;
    console.log('CODE1', res.statusCode)

    tag.get(tagId)
        .then(tag => {
            console.log('CODE', res.statusCode)
            if (tag) {
                res.json({ tag })
            } else {
                return res.status(404).json({
                    message: "The tag with the specified ID does not exist."
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "The tag's information could not be retrieved."
            })
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
    tag.insert(newUser)
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
    tag.remove(id)
        .then(deleted => {
            console.log('CODE', res.statusCode)
            if (deleted) {
                res.status(201).json({ deleted })
            } else {
                return res.status(404).json({
                    message: "The tag with the specified ID does not exist."
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
    const updatedTag = req.body;

    if (!updatedTag.tag) {
        console.log('name', updatedTag.tag);
        return res.status(400).json({
            errorMessage: "Please provide tag for the tag."
        })
    }
    tag.update(id, updatedTag)
        .then((updated) => {
            if (updated === 1) {
                console.log('tag', tag);
                console.log('tag', updated.tag);
                res.status(200).json({ updated });
            } else {
                res.status(404).json({
                    message: "The tag with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The tag could not be modified"
            })
        });
});

module.exports = router;