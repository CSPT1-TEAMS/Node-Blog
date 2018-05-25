const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const db = require('./data/db');

const server = express();

// add middleware
server.use(express.json());
server.use(cors());
server.use(helmet()); // 3

// user route handlers
server.get('/api/users', (req, res) => { // <-- REST Action/operation
  db.find() // <-- CRUD action/operation
    .then(response => {
      res.status(200);
      res.json(response);
    })
});


// dot notation ==>


// server.get('/', logger(), (req, res) => {
//   res.json({ api: 'running' });
// });

// server.use(errorHandler);

const port = 8000;
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));