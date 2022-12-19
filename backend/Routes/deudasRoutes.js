const express = require('express');
const deudasController = require('../Controller/deudasController');
const api = express.Router();

api.post('/crearDeudas', deudasController.createDeudas);
api.get('/buscarDeudas', deudasController.getDeudas);
api.delete('/eliminarDeudas/:id', deudasController.deleteDeudas);
api.put('/actualizarDeuda/:id', deudasController.updateDeudas);
api.put('/actualizarTODASDeudas',deudasController.updateDeudasAll);
api.get('/buscarDeudaEspecifica/:id' , deudasController.getDeuda);

module.exports = api