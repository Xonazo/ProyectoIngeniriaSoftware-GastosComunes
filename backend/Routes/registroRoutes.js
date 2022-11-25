const express = require('express');
const RegistroController = require('../Controller/registroController');
const Registro = require('../models/registro');
const api = express.Router();

api.post('/crearRegistro', RegistroController.createRegistro);
api.put('/actualizarRegistro/update/:id', RegistroController.updateRegistro);
api.delete('/eliminarRegistro/delete/:id', RegistroController.deleteRegistro);
api.get('/buscarRegistro/search/:id', RegistroController.getRegistro);
api.get('/buscarRegistrosTotal/search/:idVecino', RegistroController.getRegistrosVecino);

module.exports = api