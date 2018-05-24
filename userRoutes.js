const express = require('express');
const post = require('./data/helpers/postDb.js');
const tag = require('./data/helpers/tagDb.js');
const user = require('./data/helpers/userDb.js');
const logger = require('./middleware.js');
// const server = require('./server.js');

const router = express.Router();
router.use(express.json());

router.get('/', function (req, res) {
    post.get()
        .then(posts => {
            res.json({ posts })
        })
        .catch(error => {
            res.status(500).json({
                error: "The post information could not be retrieved."
            })
        })
})

router.get('/:id', function (req, res) {
    const postId = req.params.id;
    const userFound = !req.params;
    // if ( userFound === 0 ) {
    //     return res.status(404).json({
    //         message: "The post with the specified ID does not exist."
    //     })
    // }
    console.log('CODE1', res.statusCode)

    post.get(postId)
        .then(postContent => {
            console.log('CODE', res.statusCode)
            if (res.statusCode === 404) {
                return res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            } else
            console.log(userFound)
            console.log("POST", postContent);
            { res.json({ postContent }) }
        })
        .catch(error => {
            res.status(500).json({
                error: "The post's information could not be retrieved."
            })
        })
})

router.post('/', (req, res) => {
    const newPost = req.body;
    if (!newPost.text || !newPost.userId) {
        console.log('text', newPost.text);
        return res.status(400).json({
            errorMessage: "Please provide text and userId for the post."
        })
    }
    post.insert(newPost)
        .then(posts => {
            res.status(201).json({ posts });
        })
        .catch(err => {
            if (res.statusCode === 400) {
                res.status(400).json({
                    errorMessage: "Please provide title and contents for the post."
                })
            } else {
                res.status(500).json({
                    error: "There was an error while saving the post to the database"
                })
            }
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let deleted;
    post.remove(id)
        .then((deleted) => {
            res.status(201).json({ deleted});
        })
        .catch(err => {
            if (res.statusCode === 404) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            } else {
                res.status(500).json({
                    error: "The post could not be removed"
                })
            }
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedPost = req.body;

    if (!updatedPost.text) {
        console.log('text', updatedPost.text);
        return res.status(400).json({
            errorMessage: "Please provide text for the post."
        })
    }
    post.update(id, updatedPost)
        .then((updated) => {
            if (updated === 1) {
                        console.log('post', post);
                        console.log('text', updated.text);
                        res.status(200).json({ updated });
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The post could not be modified"
            })
        });
});

module.exports = router;