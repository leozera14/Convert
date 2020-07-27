const express = require('express');

const MainController = require('./src/Controllers/mainController');

const routes = express.Router();

routes.post('/file', MainController.index);

// routes.get('/file', MainController.teste);


module.exports = routes;