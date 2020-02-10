const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api/message', {
    target: 'http://localhost:8081/',
    headers: {
        "Connection": "keep-alive"
    },  
}));
};