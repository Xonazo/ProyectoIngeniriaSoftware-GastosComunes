
const { set } = require('mongoose');
const Deudas = require('../models/deudas');

const createDeudas = (req, res) => {

    const { idvecino, deuda, abono } = req.body;
    const newDeudas = new Deudas({ idvecino, deuda, abono })
    newDeudas.save((error, Deudas) => {
        if (error) {
            return res.status(400).send({ message: "Deuda no fue creada" });
        }
        return res.status(201).send(Deudas)
    })
}

const getDeudas = (req, res) => {

    Deudas.find({}, (error, deuda) => {
    if (error) {
        return res.status(400).send({ message: "Busqueda no realizada" });
    }
    return res.status(200).send(deuda);
    });
    };

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