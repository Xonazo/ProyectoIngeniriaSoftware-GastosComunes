const User = require('../models/user');

//copiado del producto

const createUser = (req, res) => {
    const { name, rut, correo, numeroVivienda, deudas, personasConvive } = req.body;
    const newUser = new User({

        name,
        rut,
        correo,
        numeroVivienda,
        deudas,
        personasConvive
    })
    newUser.save((error, user) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido crear al Vecino" });
        }
        return res.status(201).send(user)
    })
}

const getUsers = (req, res) => {
    User.find({}, (error, user) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }
        return res.status(200).send(user)
    })
}
//a
const updateUser = (req, res) => {
    const { id } = req.params
    User.findByIdAndUpdate(id, req.body, (error, user) => {

        if (error) {
            return res.status(400).send({ message: "No se pudo actualizar el vecino" });
        }
        if (!user) {
            return res.status(404).send({ message: "No se encontro al vecino" })
        }
        return res.status(200).send({ message: "Vecino modificado" })
    })

}

const deleteUser = (req, res) => {
    const { id } = req.params
    User.findByIdAndDelete(id, req.body, (error, user) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo encontrar al vecino" })
        }
        if (!user) {
            return res.status(400).send({ message: "No se pudo eliminar el vecino" })
        }
        return res.status(200).send({ message: "Se ha eliminado al vecino" })
    })

}

const getUniqueUser = (req, res) => {
    const { id } = req.params
    User.findById(id, (error, user) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }
        if (!user) {
            return res.status(404).send({ message: "No se encontro al vecino" })
        }
        return res.status(200).send(user)
    })
}

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    getUniqueUser
}