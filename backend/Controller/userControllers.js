const User = require('../models/user');
const Deudas = require('../models/deudas');
const Registro = require('../models/Registro');


const { SchemaType } = require('mongoose');

const createUser = (req, res) => {
    const { name, rut, correo, numeroVivienda, personasConvive, role } = req.body;
    const newUser = new User({

        name,
        rut,
        correo,
        numeroVivienda,
        personasConvive,
        role
    })

    newUser.save((error, user) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido crear al Usuario" });
        }
        return res.status(201).send(user)
    })
    const newDeudas = new Deudas({
        idvecino: newUser._id,
        deuda: 30000,
        abono: 0
    })
    newDeudas.save((error, deudas) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido crear al Usuario" });
        }
    })

}
const getUser = (req, res) => {

    User.find({}, (error, user) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }

        return res.status(200).send(user)
    })
}
const updateUser = (req, res) => {
    const { id } = req.params
    User.findByIdAndUpdate(id, req.body, (error, user) => {

        if (error) {
            return res.status(400).send({ message: "No se pudo actualizar el usuario" });
        }

        if (!user) {
            return res.status(404).send({ message: "No se encontro al usuario" })
        }
        return res.status(200).send({ message: "Usuario modificado" })
    })

}

const deleteUser = (req, res) => {
    const { id } = req.params
    User.findByIdAndDelete(id, req.body, (error, user) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo encontrar al usuario" })
        }
        if (!user) {
            return res.status(400).send({ message: "No se pudo eliminar el usuario" })
        }
        return res.status(200).send({ message: "Se ha eliminado al usuario" })
    })

}

const getOneUser = (req, res) => {
    const { id } = req.params
    User.findById(id, (error, user) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }
        if (!user) {
            return res.status(404).send({ message: "No se encontro al usuario" })
        }
        return res.status(200).send(user)
    })
}



const deleteCascade = (req, res) => {
    const { id } = req.params
    User.findByIdAndDelete(id, req.body, (error, user) => {

        if (error) {
            return res.status(400).send({ message: "No se pudo actualizar el usuario" });
        }

        if (!user) {
            return res.status(404).send({ message: "No se encontro al usuario" })
        }


    })
    Deudas.deleteMany({idVecino:id},(error, deudas) => {

        if (error) {
            return res.status(400).send({ message: "No se pudo actualizar el usuario" });
        }

        if (!deudas) {
            return res.status(404).send({ message: "No se encontro al usuario" })
        }

    })

    Registro.deleteMany({regidVecino:id},  (error, Registro) => {

        if (error) {
            return res.status(400).send({ message: "No se pudo actualizar el usuario" });
        }

        if (!Registro) {
            return res.status(404).send({ message: "No se encontro al usuario" })
        }


    })
    return res.status(200).send({ message: "Usuario modificado" })
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getOneUser,
    deleteCascade,
}