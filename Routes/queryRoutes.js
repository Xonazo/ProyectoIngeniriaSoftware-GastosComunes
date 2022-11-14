const express = require('express');
const queryController = require('../Controller/queryController');
const api = express.Router();

api.get('/queryPrueba/', queryController.getPrueba);


module.exports = api
