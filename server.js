const express = require('express');
// const db = require('./data/dbConfig.js');
const cors = require('cors');
const helmet = require('helmet');
const server = express();
// const router = express.Router();

const userRoutes = require('./userRoutes');
// const { logger }

server.listen(5000, () => {
    console.log('=== APP running on port 5000 ===')
})

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/posts', userRoutes);