const express = require('express');
const postData = require('./data/helpers/postDb.js');
const tagData = require('./data/helpers/userDb.js');
const userData = require('./data/helpers/userDb.js');


const server = express();

server.listen(5000, () => {
    console.log("=== SERVER RUNNING ON PORT 5000 ===");
})

