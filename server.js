const express = require('express');

const postRoutes = require('./data/routes/postRoutes');
const tagRoutes = require('./data/routes/tagRoutes');
const userRoutes = require('./data/routes/userRoutes');


const server = express();

server.listen(5000, () => {
    console.log("=== SERVER RUNNING ON PORT 5000 ===");
})

