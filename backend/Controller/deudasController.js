const { set } = require('mongoose');
const Deudas = require('../models/deudas');

const createDeudas = (req, res) => {

    const { rut, deuda, abono } = req.body;
    const newDeudas = new Deudas({ rut, deuda, abono })
    newDeudas.save((error, Deudas) => {
        if (error) {
            return res.status(400).send({ message: "Deuda no fue creada" });
        }
        return res.status(201).send(Deudas)
    })
}

const getDeudas = (req, res) => {
    const { rut }  = req.params
    Deudas.find({rut:rut}, (error, Deudas) => {
        if (error) {
            return res.status(400).send({ message: "Busqueda no realizada" })
        }
        if (!Deudas){
            return res.status(404).send({message: "No se encontro la Deuda"})
        }
        return res.status(200).send(Deudas)
    })
}

const deleteDeudas = (req, res) => {
    const { id } = req.params
    Deudas.findByIdAndDelete(id, req.body, (error, Deudas) => {
        if (error) {
            return res.status(400).send({ message: "Deuda no eliminada" })
        }
        if (!Deudas) {
            return res.status(400).send({ message: "Deuda no actualizada" })
        }
        return res.status(200).send({ message: "Deuda eliminada" })
    })

}

const updateDeudas = (req, res) => {
    const {id} = req.params
    Deudas.findByIdAndUpdate(id, req.body, (error, Deudas) => {
        if(error){
            return res.status(400).send({ message: "Deuda no actualizada"})
        }
        if(!Deudas){
            return res.status(404).send({message: "Deuda no actualizada"})
        }
        return res.status(200).send({ message: "Deuda actualizada"})
    })
}

module.exports = {
    createDeudas,
    getDeudas,
    deleteDeudas,
    updateDeudas,
}