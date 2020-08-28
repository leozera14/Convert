const express = require('express');

const MainController = require('./src/Controllers/mainController');
const searchController = require('./src/Controllers/searchController');

const routes = express.Router();

routes.post('/file', MainController.index);
routes.post('/search', searchController.searchOne);

module.exports = routes;