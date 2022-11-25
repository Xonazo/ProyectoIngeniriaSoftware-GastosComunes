const express = require ('express');
const houseController = require('../Controller/houseController');
const api = express.Router();

api.post('/createHouse',houseController.createHouse);
api.get('/getHouses',houseController.getHouses);
api.delete('/deleteHouse/:id',houseController.deleteHouse);



module.exports = api
