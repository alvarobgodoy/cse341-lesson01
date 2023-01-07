const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Alvaro Godoy!');
});

routes.get('/test', (req, res) => {
  res.send('Testing...');
});

routes.get('/test1', (req, res) => {
  res.send('Fran Godoy');
});

module.exports = routes;
