const Registro = require('../models/Registro');
const nodemailer = require('nodemailer');
const Deudas = require('../models/deudas');
const { sendVoucher } = require('./voucherController');

const createRegistro = (req, res) =>{
    const {regidVecino,fechaRegistro,cantidadPago,pago} = req.body
    const newRegistro = new Registro({ regidVecino, fechaRegistro, cantidadPago, pago })
    
    newRegistro.save((error,registro)=>{
        if(error){
            return res.status(400).send({message: "No se creo el registro"})
        }
        Deudas.updateOne({ idVecino: regidVecino }, {$inc:{deuda:-cantidadPago} },(error,pdeuda) => {
            if(error){
                newRegistro.deleteOne()
                return res.status(400).send({message: "No se actualizo la deuda"})
            }
            if(!pdeuda ){
                newRegistro.deleteOne()
                return res.status(404).send({message: "No se encontro la deuda"})
            }
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