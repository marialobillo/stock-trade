const express = require('express');
const routes = require('../routes');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cors());

server.use('/api', routes);

module.exports = server;