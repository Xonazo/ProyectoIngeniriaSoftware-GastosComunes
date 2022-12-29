const Registro = require('../models/Registro');
const nodemailer = require('nodemailer');
const Deudas = require('../models/deudas');
const User = require('../models/user');
const user = require('../models/user');

const createRegistroPago = (req, res) => {
    const { rutVecino, fechaRegistro, cantidadPago, pago } = req.body

    User.findOne({ rut: rutVecino }, (error, user) => {
        if (error) {
            return res.status(400).send({ message: "Error al buscar usuario" })
        }
        if (!user) {
            return res.status(404).send({ message: "No se encontró un usuario con ese rut" })
        }

        const newRegistro = new Registro({ regidVecino: user._id, fechaRegistro, cantidadPago, pago, rutVecino })

        newRegistro.save((error, registro) => {
            if (error) {
                return res.status(400).send({ message: "No se creo el registro" })
            }
            Deudas.findOne({ idvecino: user._id }, (error, deuda) => {
                if (error) {
                    newRegistro.deleteOne()
                    return res.status(400).send({ message: "No se actualizo la deuda" })
                }
                if (cantidadPago > deuda.deuda) {
                    newRegistro.deleteOne()
                    return res.status(404).send({ message: "No se puede restar la deuda bajo a 0" })
                }
                if (cantidadPago <= 0) {
                    newRegistro.deleteOne()
                    return res.status(404).send({ message: "La cantidad de pago no puede ser menor o igual a 0" })
                }
                if (pago === "pago abono") {
                    return res.status(404).send({ message: "El pago no puede ser un abono" })
                }
                Deudas.updateOne({ idvecino: user._id }, { $inc: { deuda: -cantidadPago } }, (error, deuda) => {
                    return res.status(201).send(registro)
                })

            })

        })
    })

}

const createRegistroAbono = (req, res) => {
    const { rutVecino, fechaRegistro, cantidadPago, pago } = req.body

    User.findOne({ rut: rutVecino }, (error, user) => {
        if (error) {
            return res.status(400).send({ message: "Error al buscar usuario" })
        }
        if (!user) {
            return res.status(404).send({ message: "No se encontró un usuario con ese rut" })
        }

        const newRegistro = new Registro({ regidVecino: user._id, fechaRegistro, cantidadPago, pago, rutVecino })

        newRegistro.save((error, registro) => {
            if (error) {
                return res.status(400).send({ message: "No se creo el registro" })
            }
            Deudas.findOne({ idvecino: user._id }, (error, deuda, abono) => {
                if (error) {
                    newRegistro.deleteOne()
                    return res.status(400).send({ message: "No se actualizo la deuda" })
                }
                if (!deuda) {
                    newRegistro.deleteOne()
                    return res.status(404).send({ message: "No se encontro la deuda" })
                }
                if(deuda.deuda > 0 ){
                    newRegistro.deleteOne()
                    return res.status(404).send({message: "No se puede crear un abono a una deuda existente"})
                }
                if(cantidadPago <= 0 ){
                    newRegistro.deleteOne()
                    return res.status(404).send({message: "La cantidad de pago no puede ser menor o igual a 0"})
                }
                if(cantidadPago > 30000 ){
                    newRegistro.deleteOne()
                    return res.status(404).send({message: "La cantidad de pago no puede ser mayor a 30000"})
                }
                if (deuda.abono >= 30000) {
                    newRegistro.deleteOne()
                    return res.status(404).send({message: "El abono no puede ser mayor o igual a 30000"})
                }
                if(pago == "pago a tiempo"){
                    newRegistro.deleteOne()
                    return res.status(404).send({message: "Pago no identificado como abono"})
                }
                if(pago == "pago con atraso"){
                    newRegistro.deleteOne()
                    return res.status(404).send({message: "Pago no identificado como abono"})
                }


                Deudas.updateOne({idvecino: user._id }, {$inc:{abono:+cantidadPago} },(error,deuda) => {
                return res.status(201).send(registro)
            })

            })

        })
    })

}



const updateRegistro = (req, res) => {
    const { id } = req.params
    Registro.findByIdAndUpdate(id, req.body, (error, Registro) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo actualizar el registro" })
        }
        if (!Registro) {
            return res.status(404).send({ message: "No se encontro el registro" })
        }
        return res.status(200).send({ message: "registro actualizado" })
    })
}

const deleteRegistro = (req, res) => {
    const { id } = req.params
    Registro.findByIdAndDelete(id, req.body, (error, Registro) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo eliminar el registro" })
        }
        if (!Registro) {
            return res.status(404).send({ message: "No se encontro el registro" })
        }
        return res.status(200).send({ message: "registro eliminada" })
    })
}

const getRegistro = (req, res) => {
    const { id } = req.params
    Registro.findById(id, req.body, (error, Registro) => {
        if (error) {
            return res.status(400).send({ message: "Busqueda no realizada" })
        }
        if (!Registro) {
            return res.status(404).send({ message: "No se encontro el Registro" })
        }
        return res.status(200).send(Registro)
    })

}

const getRegistrosVecino = (req, res) => {
    const { id } = req.params
    Registro.find({ regidVecino: id, }, (error, Registro) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo encontrar el registro" })
        }
        if (!Registro) {
            return res.status(404).send({ message: "No se encontro el Registro" })
        }
        return res.status(200).send(Registro)
    })
}

const getallRegistros = (req, res) => {

    Registro.find({}).populate({ path: 'regidVecino' }).exec((error, Registro) => {
        if (error) {
            return res.status(400).send({ message: "No se hizo la busqueda de los registros" })
        }

        return res.status(200).send(Registro)
    })
}

module.exports = {
    createRegistroPago,
    createRegistroAbono,
    updateRegistro,
    deleteRegistro,
    getRegistro,
    getRegistrosVecino,
    getallRegistros
}