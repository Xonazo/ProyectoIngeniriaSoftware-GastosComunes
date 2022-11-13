const Registro = require('../Models/registro');

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
            return res.status(400).send({message: "No se creo el registro"})
        }
        return res.status(201).send(Registro)
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
    getRegistro}