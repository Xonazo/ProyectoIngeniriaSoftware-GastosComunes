const { set } = require('mongoose');
const Deudas = require('../models/deudas');
const user = require('../models/user');

const createDeudas = (req, res) => {

    const { rutvecino, deuda, abono } = req.body;
    const newDeudas = new Deudas({ rutvecino, deuda, abono })
    newDeudas.save((error, Deudas) => {
        if (error) {
            return res.status(400).send({ message: "Deuda no fue creada" });
        }
        return res.status(201).send(Deudas)
    })
}

const getDeuda = (req, res) => {
    const { id } = req.params
    Deudas.findById(id, req.body, (error, Deuda) => {
        if (error) {
            return res.status(400).send({ message: "Busqueda no realizada" })
        }
        if (!Deuda) {
            return res.status(404).send({ message: "No se encontro la Deuda" })
        }
        return res.status(200).send(Deuda)
    })

}

const getDeudas = (req, res) => {

    Deudas.find({}).populate({ path: 'idvecino' }).exec((error, deudas) => {
        if (error) {
            return res.status(400).send({ message: "Busqueda no realizada" });
        }
        return res.status(200).send(deudas);
    });
};

const deleteDeuda = (req, res) => {
    const { id } = req.params;

    Deudas.findByIdAndUpdate(id, { $set: { deuda: 0 } }, (error, Deudas) => {
        if (error) {
            return res.status(400).send({ message: "Deuda no eliminada" });
        }

        return res.status(200).send({ message: "Deuda eliminada" });
    });
};


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

const updateOne = (req, res) => {
    // Obtener el ID de la deuda que se quiere actualizar
    const { id } = req.params;

    // Buscar la deuda con ese ID en la base de datos
    Deudas.findById(id, (error, deuda) => {
        if (error) {
            return res.status(400).send({ message: "Error al obtener la deuda" });
        }
        if (!deuda) {
            return res.status(404).send({ message: "No se encontró la deuda" });
        }

        // Actualizar la deuda
        deuda.deuda += 30000;
        deuda.deuda -= deuda.abono;
        deuda.abono = 0;
        deuda.save();

        return res.status(200).send({ message: "Deuda actualizada" });
    });
};

module.exports = {
    createDeudas,
    getDeudas,
    deleteDeuda,
    updateDeudasAll,
    getDeuda,
    updateOne
}