const Registro = require('../models/registro');
const nodemailer = require('nodemailer');
const { sendVoucher } = require('./voucherController');
const Deudas = require('../models/deudas');

const createRegistroPago = (req, res) =>{
    const {regidVecino,fechaRegistro,cantidadPago,pago} = req.body
<<<<<<< Updated upstream:Controller/RegistroControllers.js
    const newRegistro = new Registro({
        regidVecino,
        fechaRegistro,
        cantidadPago,
        pago
    })
=======
    const newRegistro = new Registro({ regidVecino, fechaRegistro, cantidadPago, pago })

>>>>>>> Stashed changes:backend/Controller/RegistroControllers.js
    newRegistro.save((error,registro)=>{
        if(error){
            return res.status(400).send({message: "No se creo el registro"})

        }
<<<<<<< Updated upstream:Controller/RegistroControllers.js
        Deudas.findOne({idVecino:newRegistro.regidVecino},(error,pdeuda) => {
            if(error){
                newRegistro.deleteOne()
                return res.status(400).send({message: "No se actualizo la deuda"})
            }if(pdeuda != null){
                newRegistro.deleteOne()
                return res.status(404).send({message: "No se encontro la deuda"})
            }
            pdeuda.updateOne({$inc:{deuda:-newRegistro.cantidadPago}} )
=======
        Deudas.updateOne({idvecino: regidVecino }, {$inc:{deuda:-cantidadPago} },(error,deuda) => {
            if(error){
                newRegistro.deleteOne()
                return res.status(400).send({message: "No se actualizo la deuda"})
            }
            if(!deuda ){
                newRegistro.deleteOne()
                return res.status(404).send({message: "No se encontro la deuda"})
            }
            if(pago == "pago abono"){
                newRegistro.deleteOne()
                return res.status(404).send({message: "El pago no puede ser un abono"})
            }
            sendVoucher(regidVecino);
>>>>>>> Stashed changes:backend/Controller/RegistroControllers.js
            return res.status(201).send(registro)
        })

    })
}

const createRegistroAbono = (req, res) =>{
    const {regidVecino,fechaRegistro,cantidadPago,pago} = req.body
    const newRegistro = new Registro({ regidVecino, fechaRegistro, cantidadPago, pago })

    newRegistro.save((error,registro)=>{
        if(error){
            return res.status(400).send({message: "No se creo el registro"})
        }
        Deudas.updateOne({idvecino: regidVecino }, {$inc:{deuda:-cantidadPago} },(error,deuda) => {
            if(error){
                newRegistro.deleteOne()
                return res.status(400).send({message: "No se actualizo la deuda"})
            }
            if(!deuda ){
                newRegistro.deleteOne()
                return res.status(404).send({message: "No se encontro la deuda"})
            }
            if(pago == "pago a tiempo"){
                newRegistro.deleteOne()
                return res.status(404).send({message: "Pago no identificado como abono"})
            }

            if(pago == "pago con atraso"){
                newRegistro.deleteOne()
                return res.status(404).send({message: "Pago no identificado como abono"})
            }

            Deudas.updateOne({idvecino: regidVecino }, {$inc:{abono:+cantidadPago} },(error) => {
                if(error){
                    newRegistro.deleteOne()
                    return res.status(400).send({message: "No se actualizo la deuda"})
                }
            })

            sendVoucher(regidVecino);
            return res.status(201).send(registro)
        })

    })
}


const updateRegistro = (req, res) => {
    const {id} = req.params
    Registro.findByIdAndUpdate(id, req.body, (error, Registro) => {
        if(error){
            return res.status(400).send({ message: "No se pudo actualizar el registro"})
        }
        if(!Registro){
            return res.status(404).send({message: "No se encontro el registro"})
        }
        return res.status(200).send({ message: "registro actualizado"})
    })
}

const deleteRegistro = (req, res) => {
    const {id} = req.params
    Registro.findByIdAndDelete(id, req.body, (error, Registro) => {
        if(error){
            return res.status(400).send({ message: "No se pudo eliminar el registro"})
        }
        if(!Registro){
            return res.status(404).send({message: "No se encontro el registro"})
        }
        return res.status(200).send({ message: "registro eliminada"})
    })
}

const getRegistro = (req, res) => {
    const {id} = req.params
    Registro.findById(id, req.body, (error, Registro) => {
        if(error){
            return res.status(400).send({ message: "Busqueda no realizada"})
        }
        if(!Registro){
            return res.status(404).send({message: "No se encontro el Registro"})
        }
        return res.status(200).send(Registro)
    })

}

const getRegistrosVecino = (req, res) => {
    const {id} = req.params
    Registro.find({regidVecino:id,},(error, Registro)=> {
    if(error){
            return res.status(400).send({ message: "No se pudo encontrar el registro"})
        }
        if(!Registro){
            return res.status(404).send({message: "No se encontro el Registro"})
        }
        return res.status(200).send(Registro)
    })
}

const getallRegistros = (req, res) => {

    Registro.find({}, (error, Registro) => {
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
<<<<<<< Updated upstream:Controller/RegistroControllers.js
    getRegistrosVecino}
=======
    getRegistrosVecino,
    getallRegistros}
>>>>>>> Stashed changes:backend/Controller/RegistroControllers.js
