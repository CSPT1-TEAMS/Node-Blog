const express = require('express')
const router = express.Router()
const db = require('./data/helpers/userDb')
const handleError = (err, req, res, next) => {
    return res.status(err.status).json(err.message);
}

router.get("/", (req, res, next) => {
    db.get()
    .then(users => {
        return res.status(200).json(users);
    })
    .catch(error => {
        next({
            status: 500,
            message: {
                error: "Error fetching data from server."
            }
        })
    })
})

router.get("/:id", (req, res, next) => {
    const { id } = req.params;
    db.get(id)
    .then(user => {
        console.log(user);
        return res.status(200).json(user);
    })
    .catch(error => {
        next({
            status: 500,
            message: {
                error: "Error fetching data from server."
            }
        })
    })
})

router.get("/:id/posts", (req, res, next) => {
    const { id } = req.params;
    db.getUserPosts(id)
    .then(posts => {
        console.log(posts);
        return res.status(200).json(posts);
    })
    .catch(error => {
        next({
            status: 500,
            message: {
                error: "Error fetching data from server."
            }
        })
    })
})

router.post("/", (req, res, next) => {
    const name = req.body;
    db.insert(name)
    .then(id => {
        return res.status(200).json(id);
    })
    .catch(error => {
        next({
            status: 500,
            message: {
                error: "Error fetching data from server."
            }
        })
    })
})

router.delete("/:id", (req, res, next) => {
    const { id } = req.params;
    db.remove(id)
    .then(count => {
        return res.status(200).json(count);
    })
    .catch(error => {
        next({
            status: 500,
            message: {
                error: "Error fetching data from server."
            }
        })
    })
})

router.put("/:id", (req, res, next) => {
    const { id } = req.params;
    const name = req.body;
    db.update(id, name)
    .then(id => {
        return res.status(200).json(id);
    })
    .catch(error => {
        next({
            status: 500,
            message: {
                error: "Error fetching data from server."
            }
        })
    })
})

router.use(handleError);

module.exports = router