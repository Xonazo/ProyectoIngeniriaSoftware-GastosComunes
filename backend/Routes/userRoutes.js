const express = require ('express');
const userController = require('../Controller/userControllers');
const api = express.Router();
const auth = require('../middlewares/auth');


api.post('/crearUser',userController.createUser);
api.get('/buscarUser',userController.getUser);
api.put('/updateUser/:id',userController.updateUser);
api.delete('/deleteUser/:id',userController.deleteUser);
api.get('/findOneUser/:id',userController.getOneUser);
api.get('/getAll/:id',userController.getAll);

api.post('/user/login',userController.login);
api.get('/checkToken',auth.auth, userController.checkToken);
api.get('/logout',auth.auth, userController.logout);


api.get('/getUsersNoPay', userController.getUsersNoPay);
api.get('/getUsersPay', userController.getUsersPay);

module.exports = api