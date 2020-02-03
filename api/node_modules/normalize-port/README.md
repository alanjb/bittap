# normalize-port

A handy function that normalizes a port into a number, string, or false.

## install

`npm install --save normalize-port`

## usage

```javascript
const http = require('http');
const normalizePort = require('normalize-port');

const port = normalizePort(process.env.PORT || '3000');

const server = http.createServer(listenerOrApp).listen(port, () => {
  console.log(`listening on ${port}`)
})
```

## credit

I just pulled this little function out of the default
[express-generator](https://github.com/expressjs/generator) template.
