const Registro = require('../models/registro');
const nodemailer = require('nodemailer');
const { sendVoucher } = require('./voucherController');
const Deudas = require('../models/deudas');

const createRegistro = (req, res) =>{
    const {regidVecino,fechaRegistro,cantidadPago,pago} = req.body
    const newRegistro = new Registro({
        regidVecino,
        fechaRegistro,
        cantidadPago,
        pago
    })
    newRegistro.save((error,registro)=>{
        if(error){
            return res.status(400).send({message: "No se creo el registro"})

        }
        Deudas.findOne({idVecino:newRegistro.regidVecino},(error,pdeuda) => {
            if(error){
                newRegistro.deleteOne()
                return res.status(400).send({message: "No se actualizo la deuda"})
            }if(pdeuda != null){
                newRegistro.deleteOne()
                return res.status(404).send({message: "No se encontro la deuda"})
            }
            pdeuda.updateOne({$inc:{deuda:-newRegistro.cantidadPago}} )
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
    const {idVecino} = req.params
    Registro.find({regidVecino:idVecino},(error,registro)=> {
    if(error){
            return res.status(400).send({ message: "No se pudo encontrar el registro"})
        }
        if(!Registro){
            return res.status(404).send({message: "No se encontro el Registro"})
        }
        return res.status(200).send(Registro)
    })
}

module.exports = {
    createRegistro,
    updateRegistro,
    deleteRegistro,
    getRegistro,
    getRegistrosVecino}