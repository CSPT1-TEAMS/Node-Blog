const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const db = require('./data/helpers/postDb');
const db2 = require('./data/helpers/tagDb');
const db3 = require('./data/helpers/userDb');
const server = express();
const userRoutes = require('./data/helpers/userRoutes');
// const postRoutes = require('./data/helpers/postRoutes');
server.use(logger('loading'))
// server.use(greeter());
// const logger = (req, res, next) => {
//     console.log('LOGGER'. req.url);
//     next();
// }

server.listen(3000, () => {
    console.log(' APP Running on port 3333 ');
})

const router = express.Router()

server.use(helmet());
server.use(express.json());

//protected routes that require authentication 
function logger(msg) {
    return function(req, res, next) {
        console.log(`${msg || 'requesting'}: ${req.url}`)
        next();
    }
}
server.get('/api/users', logger('loading from get'), (req, res) =>{

})

//for complicated queries we use subroutes
// GET api/customers is the main route
// GET /api/customers/no-appointments
//GET //api/


//if (its imported

server.use('/', userRoutes)
// server.use('/api/products', productRoutes)

// router.get('/:id/products/:productId',  (req, res) =>{
//     db.findById(req.params)
//     .then(response => {
//         console.log(response)
//         res.json(response[0])
//         productdb.findById(req.params.productId)
//         .then(productResponse)

//     })
// })





router.get('apifd saf', logger('loading get'), (req, res) =>
{
    db.findById()
    .then(response => {
        
            res.status(200);
            res.json(response);
        
    })
})

module.exports = router;

// function greeter(name) {
//     if (req.query.passcode === 'gandalf') { //req.query is looking at everything after the ?title=Hobbit&character=Bilbo
//         next()
//     } else {
//         res.send('YOU SHALL NOT PASS')
//     }
// }

router.get('/say-hello', (req, res) => {
    res.send('hello')
})

module.exports = router; 