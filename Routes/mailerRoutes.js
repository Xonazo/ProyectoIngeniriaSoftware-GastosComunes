const { Router } = require('express');
const express = require('express');
const api = express.Router();
const mailerController = require('../Controller/mailerController');



api.post('/mail',mailerController)


module.exports = api

