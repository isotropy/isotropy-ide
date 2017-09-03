require('babel-register'); // TODO: not to be used in prod
const express = require('express');
const compression = require('compression');

const app = express();
app.use(compression());
const port = process.env.port || 8080;

app.use('/assets', express.static('dist'));
app.use('/vs', express.static('vs'));
app.use('/fs', express.static('fs'));
app.get('/', function(req, res) {
  res.sendFile('index.html', { root: './' });
});

const server = app.listen(port, () => {
  console.info(
    { code: 'SUCCESS' },
    `server listening on: ${port}, NODE_ENV:${process.env.NODE_ENV}`
  );
});

module.exports = server;
