const Casa = require('../models/casa');

const createCasa = (req, res) => {
    const { numeroVivienda } = req.body;
    const newCasa = new Casa({

        numeroVivienda,
    })

    newCasa.save((error, casa) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido crear la casa" });
        }
        return res.status(201).send(casa)
    })
}

const getCasas = (req, res) => {
    Casa.find({}, (error, casa) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }
        return res.status(200).send(casa)
    })
}

const deleteCasa = (req, res) => {
    const { id } = req.params
    Casa.findByIdAndDelete(id, req.body, (error, casa) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo encontrar la casa" })
        }
        if (!casa) {
            return res.status(400).send({ message: "No se pudo eliminar la casa" })
        }
        return res.status(200).send({ message: "Se ha eliminado la casa" })
    })

}

module.exports = {

    createCasa,
    getCasas,
    deleteCasa
}