const express = require ('express');
const userController = require('../Controller/userControllers');
const api = express.Router();


//api.post('/crearVecino',authPage(["admin"]),vecinoController.createVecino);


api.post('/crearUser',userController.createUser);
api.get('/buscarUser',userController.getUser);
api.put('/updateUser/:id',userController.updateUser);
api.delete('/deleteUser/:id',userController.deleteUser);
api.get('/findOneUser/:id',userController.getOneUser);




module.exports = api

