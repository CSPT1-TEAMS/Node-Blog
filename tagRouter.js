const express = require('express')
const router = express.Router()
const db = require('./data/helpers/tagDb')
const handleError = (err, req, res, next) => {
    return res.status(err.status).json(err.message);
}

router.get("/", (req, res, next) => {
    db.get()
    .then(tags => {
        return res.status(200).json(tags);
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
    .then(tag => {
        console.log(tag);
        return res.status(200).json(tag);
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
    const tag = req.body;
    db.insert(tag)
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
    const tag = req.body;
    db.update(id, tag)
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