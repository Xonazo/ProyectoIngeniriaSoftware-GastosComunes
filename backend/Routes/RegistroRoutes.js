const express = require('express');
const RegistroController = require('../Controller/RegistroControllers');
const api = express.Router();

api.post('/CrearRegistroPago', RegistroController.createRegistroPago);
api.post('/CrearRegistroAbono', RegistroController.createRegistroAbono);
api.put('/ActualizarRegistro/update/:id', RegistroController.updateRegistro);
api.delete('/EliminarRegistro/delete/:id', RegistroController.deleteRegistro);
api.get('/BuscarRegistro/search/:id', RegistroController.getRegistro);
api.get('/BuscarRegistrosTotal/search/:id', RegistroController.getRegistrosVecino);
api.get('/BuscarRegistrosAll', RegistroController.getallRegistros);

module.exports = api
