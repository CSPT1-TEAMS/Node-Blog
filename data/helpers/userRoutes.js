const express = require('express')
const helmet = require('helmet');
const db3 = require('./userDb');

const router = express.Router();
//middleware
router.use(helmet());
router.use(express.json());

router.get('/api/users/', (req, res) =>{
    const { id } = req.params.id;

    db3.get(id)
    .then(response => {
        res.status(200).json({response})
    })
    .catch(err => {
        res.status(500).json({err})
    })
})

router.post('/api/users', (req, res)  => {
    const { user } = req.body;
db3.insert(user)
    .then(response => {
        res.status(200).json({user});
    })
    .catch(err => {
        res.status(500).json({err});
    })
})

router.put('/api/users/:id', (req, res) => {
    const { user } = req.body
    const { id } = req.params.id

    db3.update(id, user)
    .then(response =>{ 
        res.status(200).json({response})
    })
    .catch(err => {
        res.status(500).json({err});
    })
})

router.delete('/api/users/:id', (req, res) => {
    const { id } = req.params.id;
    db3.remove(id)
    .then(response => {
        this.status(200).json({response})
    })
})


module.exports = router;