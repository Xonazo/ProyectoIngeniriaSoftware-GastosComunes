const User = require('../models/user');


const checkEmail = (req, res, next) => {
    const {correo} = req.body;
    User.findOne({correo}, (error, user) => {
        if (error) {
            return res.status(400).send({message: "No se pudo realizar la busqueda"})
        }
        if (!user) {
            return res.status(400).send({message: "El usuario no existe"})
        }
        next();
    })
}

module.exports = checkEmail