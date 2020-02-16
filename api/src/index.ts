import * as http from 'http';
import * as debug from 'debug';

import App from './app';

debug('ts-express:server');
const port = normalizePort(process.env['PORT'] || 3000);

function init() { 
    
    // call bash script to ssh into specific IP address or in this case bittap.io. set this up through heroku 
    // once connection is reached, call realtime micro service to to hit establish connection between 
}

const port = process.env.API_PORT || 5000;

app.listen(port, () => console.log('Server is running on port...' + port));