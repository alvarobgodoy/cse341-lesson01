const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Alvaro Godoy!');
});

routes.get('/test', (req, res) => {
  res.send('Testing...');
});

module.exports = routes;
