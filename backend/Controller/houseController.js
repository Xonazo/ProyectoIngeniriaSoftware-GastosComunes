const House = require('../models/house');

const createHouse = (req, res) => {
    const { numeroVivienda } = req.body;
    const newHouse = new House({

        numeroVivienda,
    })

    newHouse.save((error, house) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido crear la casa" });
        }
        return res.status(201).send(house)
    })
}

const getHouses = (req, res) => {
    House.find({}, (error, house) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }
        return res.status(200).send(house)
    })
}

const deleteHouse = (req, res) => {
    const { id } = req.params
    House.findByIdAndDelete(id, req.body, (error, house) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo encontrar la casa" })
        }
        if (!house) {
            return res.status(400).send({ message: "No se pudo eliminar la casa" })
        }
        return res.status(200).send({ message: "Se ha eliminado la casa" })
    })

}

module.exports = {

    createHouse,
    getHouses,
    deleteHouse
}