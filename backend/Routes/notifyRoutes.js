const express = require('express');
const notifyController = require('../Controller/notifyController');
const api = express.Router();

api.get('/notify', notifyController.notify);
api.get('/notifyUser/:id', notifyController.notifyUser);


module.exports = api

