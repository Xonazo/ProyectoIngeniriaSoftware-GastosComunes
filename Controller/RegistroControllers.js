const Registro = require('../models/Registro');

const createRegistro = (req, res) =>{
    const {idVecino,deudas,fechaPago,cantidadPago,pago,abono} = req.body
    const newRegistro = new Registro({
        idVecino,
        deudas,
        fechaPago,
        cantidadPago,
        pago,
        abono
    })
    newRegistro.save((error,Registro)=>{
        if(error){
            return res.status(400).send({message: "No se creo"})
        }
        return res.status(201).send(Registro)
    })
}

const getRegistros = (req, res) =>{
    Registro.find({}, (error, Registro) => {
    if(error) {
        return res.status(400).send({message:"No se pudo realizar la busqueda"})
    }
    if(Registro.length == 0){
        return res.status(404).send({message:"No se encontro"})
    }
    return res.status(200).send(Registro)
    })
}

const updateRegistro = (req, res) => {
    const {id} = req.params
    Registro.findByIdAndUpdate(id, req.body, (error, Registro) => {
        if(error){
            return res.status(400).send({ message: "No se pudo actualizar la persona"})
        }
        if(!Registro){
            return res.status(404).send({message: "No se encontro la persona"})
        }
        return res.status(200).send({ message: "Persona actualizada"})
    })
}

const deleteRegistro = (req, res) => {
    const {id} = req.params
    Registro.findByIdAndDelete(id, req.body, (error, Registro) => {
        if(error){
            return res.status(400).send({ message: "No se pudo eliminar a la persona"})
        }
        if(!Registro){
            return res.status(404).send({message: "No se encontro la persona"})
        }
        return res.status(200).send({ message: "Persona eliminada"})
    })
}

const getRegistro = (req, res) => {
    const {id} = req.params
    Registro.findById(id, req.body, (error, Registro) => {
        if(error){
            return res.status(400).send({ message: "No se pudo encontrar a la persona"})
        }
        if(!Registro){
            return res.status(404).send({message: "No se encontro la persona"})
        }
        return res.status(200).send(Registro)
    })

}

module.exports = {
    createRegistro,
    getRegistros,
    updateRegistro,
    deleteRegistro,
    getRegistro}