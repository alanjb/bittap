'use strict';
const express = require("express");
const dotenv = require('dotenv');

const http = require('http');
// create socketio 
const socketIO = require("socket.io");
const createError = require('http-errors');
const logger = require('morgan');
const session = require("express-session");
const normalizePort = require('normalize-port');

//create express app
const app = express();
dotenv.config();

// our server instance
const server = http.createServer(app);
// This creates our socket using the instance of the server
// const io = socketIO(server);

const connectDB = require('./config/database/db.js');
const path = require('path');
require('custom-env').env();
require('dotenv').config({path: __dirname + '/.env'});
const cors = require('cors');

// conntect to database
// connectDB();

// Init Middleware - get data in req.body
app.use(express.json({ extended: false }));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'k83shs38egfg3123gkei',
  resave: true,
  saveUninitialized: false
}));



// app.use(app.router);
// routes.initialize(app);
// const signinRouter = require('./index');
// const registerRouter = require('./routes/api/register');
const dashboardRouter = require('./api/src/dashboard');

// Define Routes
// app.use('/', signinRouter);
app.use('/dashboard', dashboardRouter);

// 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    next();
});
 
// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build')); 
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
else {
    app.use(express.static(__dirname + '/public'));
}

app.get('/', (req, res) => res.send('Bittap is running...'));

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

module.exports = app;