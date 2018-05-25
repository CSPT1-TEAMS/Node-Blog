const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const db = require('./data/dbConfig.js');

const server = express();



// apply middleware
server.use(express.json());
server.use(cors());
server.use(helmet());


// user route handlers
server.get('/api/users', (req, res) => { // <-- REST Actions
  // res.json('hello');
  db.find() // <-- CRUD action/operation server query db
  .then(response => {
    res.status(200);
    res.json(response); // <-- finish REST operation    
  })
});

// dot notation ==>

// server.get('/', logger(), (req, res) => {
  //   res.json({ api: 'running' });
  // });
  
// server.use(errorHandler);

// define server
const port = 8000;
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));
