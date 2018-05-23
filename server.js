const express = require('express');

const postRoutes = require('./data/routes/postRoutes');
const tagRoutes = require('./data/routes/tagRoutes');
const userRoutes = require('./data/routes/userRoutes');


const server = express();
server.use(express.json());

server.use('/posts', postRoutes);

server.get('/', (req, res) => {
    res.send('Api is running!');
})

server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'))
