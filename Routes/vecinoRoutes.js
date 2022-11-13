const express = require ('express');
const vecinoController = require('../Controller/vecinoControllers');
const api = express.Router();

//a
api.post('/crearVecino',vecinoController.createVecino);
api.get('/buscarVecinos',vecinoController.getVecinos);
api.put('/actualizarVecino/:rut',vecinoController.updateVecino);
api.delete('/eliminarVecino/:rut',vecinoController.deleteVecino);
api.get('/buscarVecinoRut/:rut',vecinoController.getUniqueVecinoRut);
api.get('/buscarVecinoVivienda/:numeroVivienda',vecinoController.getUniqueVecinoVivienda);





module.exports = api

