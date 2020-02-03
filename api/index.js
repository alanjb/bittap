'use strict';
const express = require("express");
const dotenv = require('dotenv');
const http = require('http');
const socketio = require("socket.io");
const createError = require('http-errors');
const logger = require('morgan');
const session = require("express-session");
const normalizePort = require('normalize-port');
const app = express();
const server = http.createServer(app);
const connectDB = require('/config');
const path = require('path');
const dashboardRouter = require('./src/dashboard/dashboard');
const cors = require('cors');
require('custom-env').env();
require('dotenv').config({path: __dirname + '/.env'});

dotenv.config();

app.use(express.json({extended:false}));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dashboard', dashboardRouter);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    next();
});
 
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build')); 
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
} else {
    app.use(express.static(__dirname + '/public'));
}

app.get('/', (req, res) => res.send('Bittap is running!!!!!'));

app.post('/api/message', (req, res) => {
    console.log(req.body.message);
    res.end();
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

module.exports = app;