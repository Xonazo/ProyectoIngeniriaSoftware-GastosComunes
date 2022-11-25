const express = require ('express');
const vecinoController = require('../Controller/userControllers');
const api = express.Router();

//a
api.post('/crearVecino',vecinoController.createVecino);
api.get('/buscarVecinos',vecinoController.getVecinos);
api.put('/actualizarVecino/:id',vecinoController.updateVecino);
api.delete('/eliminarVecino/:id',vecinoController.deleteVecino);
api.get('/buscarVecino/:id',vecinoController.getUniqueVecino);





module.exports = api

