'use strict';
const express = require("express");
const dotenv = require('dotenv');
const app = express();
const path = require('path');
const cors = require('cors');

require('dotenv').config();
dotenv.config();

app.use(express.json({extended:false}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "localhost:8081");
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

app.get('/', (req, res) => res.send('Bittap is running!'));

app.post('/api/message', (req, res) => {
    alert(req.body.message);
    console.log(req.body.message);
    res.end();
});

//port 8081
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

module.exports = app;