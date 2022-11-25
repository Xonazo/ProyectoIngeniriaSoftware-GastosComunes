const User = require('../models/user');
//copiado del producto

const createUser = (req, res) => {
    const { name, rut, correo, numeroVivienda, deudas, personasConvive, diaPago, role } = req.body;
    const newUser = new User({

        name,
        rut,
        correo,
        numeroVivienda,
        deudas,
        personasConvive,
        diaPago,
        role
    })
    newUser.save((error, user) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido crear al Usuario" });
        }
        return res.status(201).send(user)
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

const getUniqueVecinoVivienda = (req, res) => {
    const { numeroVivienda } = req.params

    Vecino.find({ numeroVivienda }, (error, vecino) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }
        if (!vecino) {
            return res.status(404).send({ message: "No se encontro al vecino" })
        }
        return res.status(200).send(vecino)
    })
}





module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getOneUser
}