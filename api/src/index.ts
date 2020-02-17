import * as http from 'http';
import App from './app';

const port = process.env.API_PORT || 5000;
const server = http.createServer(App);
const io = require('socket.io')(http);

io.on('connection', function(socket: any){
    console.log('a user connected');
    socket.on("message", function(message: any) {
        console.log(message);
    });
});

server.listen(port, () => console.log('Server is running on port...' + port));