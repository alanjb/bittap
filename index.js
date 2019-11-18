'use strict';
const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const socketIO = require("socket.io");
const createError = require('http-errors');
const logger = require('morgan');
const session = require("express-session");
const normalizePort = require('normalize-port');

const okta = require("@okta/okta-sdk-nodejs");
const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;

const app = express();

let oktaClient = new okta.Client({
    orgUrl: 'https://dev-110361.okta.com',
    token: '009BGldlOf_3WGo17fW3JYcyud1cr8l6GG4wCRmCeC'
});
  
const oidc = new ExpressOIDC({
    issuer: "https://dev-110361.okta.com/oauth2/default",
    client_id: '0oa1iv6nay8bt3CBe357',
    client_secret: '18hkhl4Nl9M0-6a4AObtBQsQkFeJLBztENmle6f7',
    redirect_uri: 'http://localhost:8080/users/callback',
    scope: "openid profile",
    routes: {
      login: {
        path: "/users/login"
      },
      callback: {
        path: "/users/callback",
        defaultRedirect: "/dashboard"
      }
    }
});

// our server instance
const server = http.createServer(app);
// This creates our socket using the instance of the server
const io = socketIO(server);

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
app.use(oidc.router);
app.use((req, res, next) => {
    if (!req.userinfo) {
      return next();
    }
    oktaClient.getUser(req.userinfo.sub)
      .then(user => {
        req.user = user;
        res.locals.user = user;
        next();
      }).catch(err => {
        next(err);
      });
  });

// app.use(app.router);
// routes.initialize(app);
const signinRouter = require('./routes/api/signin');
const registerRouter = require('./routes/api/register');
const dashboardRouter = require('./routes/api/dashboard');

// Define Routes
app.use('/', signinRouter);
app.use('/register', loginRequired, registerRouter);
app.use('/dashboard', dashboardRouter);

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
// app.get('/api/register', (req, res) => res.send('register...'));

app.get('/test', (req, res) => {
    res.json({ profile: req.user ? req.user.profile : null });
  });

function loginRequired(req, res, next) {
if (!req.user) {
    return res.status(401).render("Unauthenticated User...");
}
next();
}

// web sockets implementation 
io.on('connection', socket => {
    console.log('New client connected!'); 

    //Here we listen on a new namespace called "incoming data"
    socket.on("incoming data", (data)=>{
        //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
        socket.broadcast.emit("outgoing data", {num: data});
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
});

// normalizePort is a safeguard function if port value is NaN or false
const PORT = process.env.PORT || 8080;


server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

module.exports = app;