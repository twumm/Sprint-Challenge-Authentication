const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const configureRoutes = require('../config/routes.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);

configureRoutes(server);

server.get('/', (req, res) => {
  res
    .status(200)
    .json({ content: 'up' });
})

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} request from ${req.url}}`
  );
  next();
}

function errorHandler(error, req, res) {
  console.error('ERROR', error);
  res
    .status(500)
    .json({
      message: error.message,
      stack: error.stack
    });
}

server.use(errorHandler);

module.exports = server;
