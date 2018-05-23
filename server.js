const express = require('express');
const helmet = require('helmet');
const db = require('./data/db');

const server = express();

const logger = (req, res, next) => {
    console.log('LOGGER'. req.url);
}