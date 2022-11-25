const express = require('express');
const RegistroController = require('../Controller/RegistroControllers');
const Registro = require('../models/Registro');
const api = express.Router();

api.post('/CrearRegistro', RegistroController.createRegistro);
api.put('/ActualizarRegistro/update/:id', RegistroController.updateRegistro);
api.delete('/EliminarRegistro/delete/:id', RegistroController.deleteRegistro);
api.get('/BuscarRegistro/search/:id', RegistroController.getRegistro);
api.get('/BuscarRegistrosTotal/search/:idVecino', RegistroController.getRegistrosVecino);
module.exports = api