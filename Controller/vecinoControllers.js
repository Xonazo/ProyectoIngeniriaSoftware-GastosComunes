const vecino = require('../models/vecino');
const Vecino = require('../models/vecino');

//copiado del producto

const createVecino = (req, res) => {
    const { name, rut, correo, numeroVivienda, deudas, personasConvive } = req.body;
    const newVecino = new Vecino({
        
        name,
        rut,
        correo,
        numeroVivienda,
        deudas,
        personasConvive
    })
    newVecino.save((error, vecino) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido crear al Vecino" });
        }
        return res.status(201).send(vecino)
    })
}

const getVecinos = (req, res) => {
    Vecino.find({}, (error, vecino) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }
        return res.status(200).send(vecino)
    })
}
//a
const updateVecino = (req, res) => {
    const { rut } = req.params
    Vecino.findOneAndUpdate(rut, req.body, (error, vecino) => {

        if (error) {
            return res.status(400).send({ message: "No se pudo actualizar el vecino" });
        }
        if (!vecino) {
            return res.status(404).send({ message: "No se encontro al vecino" })
        }
        return res.status(200).send({ message: "Vecino modificado" })
    })

}

const deleteVecino = (req, res) => {
    const { rut } = req.params
    Vecino.findOneAndDelete(rut, req.body, (error, vecino) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo eliminar al vecino" })
        }
        if (!vecino) {
            return res.status(400).send({ message: "No se pudo encontrar el vecino" })
        }
        return res.status(200).send({ message: "Se ha eliminado al vecino" })
    })

}

const getUniqueVecinoRut = (req, res) => {
    const { rut } = req.params

    Vecino.find({rut},(error,vecino) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }
        if (!vecino) {
            return res.status(404).send({ message: "No se encontro al vecino" })
        }
        return res.status(200).send(vecino)
    })
}

const getUniqueVecinoVivienda = (req, res) => {
    const { numeroVivienda } = req.params

    Vecino.find({numeroVivienda},(error,vecino) => {
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
    createVecino,
    getVecinos,
    updateVecino,
    deleteVecino,
    getUniqueVecinoRut,
    getUniqueVecinoVivienda
}