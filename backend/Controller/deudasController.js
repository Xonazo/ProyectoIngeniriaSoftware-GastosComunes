
const { set } = require('mongoose');
const Deudas = require('../models/deudas');
const User = require('../models/deudas');

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

const getDeuda = (req, res) => {
    const {id} = req.params
    Deudas.findById(id, req.body, (error, Deuda) => {
        if(error){
            return res.status(400).send({ message: "Busqueda no realizada"})
        }
        if(!Deuda){
            return res.status(404).send({message: "No se encontro la Deuda"})
        }
        return res.status(200).send(Deuda)
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

const updateDeudasAll = (req, res) => {
    Deudas.find((error, deudas) => {
      if (error) {
        return res.status(400).send({ message: "Error al obtener deudas" });
      }
      if (!deudas) {
        return res.status(404).send({ message: "No se encontraron deudas" });
      }

      deudas.forEach(deuda => {
        deuda.deuda += 30000;
        deuda.deuda -= deuda.abono;
        deuda.abono = 0;
        deuda.save();
      });

      return res.status(200).send({ message: "Deudas actualizadas" });
    });
  };


module.exports = {
    createDeudas,
    getDeudas,
    deleteDeudas,
    updateDeudas,
    updateDeudasAll,
    getDeuda,
}