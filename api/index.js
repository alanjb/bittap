const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 

const app = express();

app.use(bodyParser.json()); 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send(`Hello World !`)
})

app.get('/test', (req, res) => {
    res.send(`aksdlmakmsdlasd !`)
})

app.post('/api/message', (req, res) => {
    res.send('Got a POST request:' + req.body.message);
    console.log("this is our post request from console: " + req.body.message);
    res.end();
});

const port = process.env.API_PORT || 5000;

app.listen(port, () => console.log('Server is running on port...' + port));