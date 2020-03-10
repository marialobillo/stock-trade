const express = require('express');
const routes = require('../routes');
const cors = require('cors');
const path = require('path');

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());

// Priority serve any static files.
server.use(express.static(path.resolve(__dirname, '../client/build')));

server.use('/api', routes);

// All remaining requests return the React app, so it can handle routing.
server.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

module.exports = server;