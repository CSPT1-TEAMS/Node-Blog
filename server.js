const express = require('express');
const post = require('./data/helpers/postDb.js');
const tag = require('./data/helpers/tagDb.js');
const user = require('./data/helpers/userDb.js');

const cors = require('cors');
const helmet = require('helmet');
const server = express();
// const router = express.Router();

// const userRouter = require('./usersRoutes');
// const { logger }

server.listen(5000, () => {
    console.log('=== APP running on port 5000 ===')
})

server.use(helmet());
server.use(cors());
server.use(express.json());


server.get('/api/posts', function (req, res) {
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

server.get('/api/posts/:id', function (req, res) {
    const postId = req.params.id;
    if (postId === null) {
        return res.status(404).json({
            message: "The post with the specified ID does not exist."
        })
    }
    post.get(postId)
        .then(postContent => {
            console.log("POST", postContent); 
            {res.json({ postContent })}
        })
        .catch(error => {
            res.status(500).json({
                error: "The post's information could not be retrieved."
            })
        })
})

server.post('/api/posts', (req, res) => {
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

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    let deleted;
    post.remove(id)
        .then(() => {
            res.status(201).json({ message: "Post has been deleted" });
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

server.put('/api/posts/:id', (req, res) => {
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
            console.log('post', updated);
            if (updated > 0) {
                post.update(id)
                    .then(post => {
                        // console.log('post', post);
                        // console.log('text', post.text);
                        res.status(200).json({ post });
                    })
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