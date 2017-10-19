"use strict";

require('dotenv').config();

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('common'));
app.use(express.static(__dirname + '/public'));
app.use(require('./app/routes'));

const server = http.Server(app);

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

const io = socketIO(server);

require('./app/socket')(io);

process.on('uncaughtException', (err) => {
    shutdown('Uncaught excecption occurred', err);
});

function shutdown(message, err) {
    console.log(`${message}: gracefully shutting down...`);
    console.error(err);
    process.exit(1);
}