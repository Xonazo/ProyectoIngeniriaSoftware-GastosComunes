const express = require ('express');
const userControllers = require('../Controller/userControllers');
const api = express.Router();

//a
api.post('/crearUser',userControllers.createUser);
api.get('/buscarUser',userControllers.getUsers);
api.put('/actualizarUser/:id',userControllers.updateUser);
api.delete('/eliminarUser/:id',userControllers.deleteUser);
api.get('/buscarUser/:id',userControllers.getUniqueUser);





module.exports = api

