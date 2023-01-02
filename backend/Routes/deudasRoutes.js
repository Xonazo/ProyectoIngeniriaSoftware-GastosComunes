const express = require('express');
const deudasController = require('../Controller/deudasController');
const api = express.Router();

api.post('/crearDeudas', deudasController.createDeudas);
api.get('/buscarDeudas', deudasController.getDeudas);
api.put('/eliminarDeuda/:id', deudasController.deleteDeuda);
api.put('/actualizarTODASDeudas',deudasController.updateDeudasAll);
api.get('/buscarDeudaEspecifica/:id' , deudasController.getDeuda);
api.put('/updateOne/:id' , deudasController.updateOne);

module.exports = api