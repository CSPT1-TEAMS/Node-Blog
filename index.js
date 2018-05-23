const express = require('express')
const bodyParser = require('body-parser')
const userdb = require('./data/helpers/userDb')
const postdb = require('./data/helpers/postDb')
const tagdb = require('./data/helpers/tagDb')
const tagRouter = require('./tags')


const app = express()
app.use('/tags',tagRouter)
app.use( bodyParser.json())

app.get('/users',(req,res) => {
    userdb.get().then(results => {
        res.status(200).send(results)
    }).catch(err => err)
})

app.get('/users/:id',(req,res) => {
    userdb.get(req.params.id).then(result => {
        res.status(200).send(result)
    })
})

app.post('/users',(req,res)=> {
    let name = req.body.name
    userdb.insert({name}).then(result => {
        res.status(200).send(result)
    })
})

app.put('/users/:id',(req,res) => {
    userdb.update(req.params.id,{name:req.body.name}).then((result)=> {
        res.status(200).json({result})
    }).catch(err => res.send(err.message))

})








app.listen('5000',()=>{
    console.log('app running on port 5000')
})