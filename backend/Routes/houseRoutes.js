const express = require ('express');
const casaController = require('../Controller/houseController');
const api = express.Router();

api.post('/crearCasa',casaController.createCasa);
api.get('/buscarCasas',casaController.getCasas);
api.delete('/eliminarCasa/:id',casaController.deleteCasa);



module.exports = api
