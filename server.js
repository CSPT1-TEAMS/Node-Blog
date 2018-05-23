const express = require('express');
const helmet = require('helmet');
const db = require('./data/helpers/postDb');
const db2 = require('./data/helpers/tagDb');
const db3 = require('./data/helpers/userDb');
const server = express();

const logger = (req, res, next) => {
    console.log('LOGGER'. req.url);
}