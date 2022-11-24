const express = require ('express');
const condominioController = require('../Controller/condominioController');
const api = express.Router();

api.post('/crearCasa',condominioController.createCondominio);
api.get('/buscarCasas',condominioController.getCasas);
api.delete('/eliminarCasa/:id',condominioController.deleteCondominio);



module.exports = api