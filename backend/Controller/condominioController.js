const Condominio = require('../models/condominio');

const createCondominio = (req, res) => {
    const { numeroVivienda } = req.body;
    const newCondominio = new Condominio({

        numeroVivienda,
        
    })

    newCondominio.save((error, condominio) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido crear la casa" });
        }
        return res.status(201).send(condominio)
    })
    
}

const getCasas = (req, res) => {
    Condominio.find({}, (error, condominio) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }
        return res.status(200).send(condominio)
    })
}

const deleteCondominio = (req, res) => {
    const { id } = req.params
    Condominio.findByIdAndDelete(id, req.body, (error, condominio) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo encontrar la casa" })
        }
        if (!condominio) {
            return res.status(400).send({ message: "No se pudo eliminar la casa" })
        }
        return res.status(200).send({ message: "Se ha eliminado la casa" })
    })

}






module.exports = {

    createCondominio,
    getCasas,
    deleteCondominio
}