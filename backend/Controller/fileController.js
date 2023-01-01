const { isReadable } = require("stream")
const fileModel = require("../models/file")
const User = require("../models/user")

const uploadNewFile = (req, res) => {
    const { files } = req
    const { id } = req.params
    User.findById(id, (err, user) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el usuario" })
        }
        if (!user) {
            return res.status(404).send({ message: "Usuario no existe" })
        }
        let aux = files.map((file) => {
            const newFile = new fileModel({
                url: file.path,
                name: file.originalname,
                mimeType: file.mimetype,
                user: id,
                nombre: user.name
            })
            newFile.save((err, fileSaved) => {
                if (err) {
                    return res.status(400).send({ message: "Error al guardar el archivo" })
                }
            })
            return newFile
        })
        return res.status(201).send(aux)
    })

}

const getFiles = (req, res) => {
    fileModel.find({}, (err, file) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener los archivos" })
        }
        return res.status(200).send(file)
    })
}

const getSpecificFile = (req, res) => {
    const { id } = req.params
    fileModel.findById(id, (err, file) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el archivo" })
        }
        if (!file) {
            return res.status(404).send({ message: "Archivo no existe" })
        }
        return res.download('./' + file.url)
    })
}

const getFile = (req, res) => {
    const { id } = req.params
    fileModel.findById(id, (err, file) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el archivo" })
        }
        if (!file) {
            return res.status(404).send({ message: "Archivo no existe" })
        }
        return res.status(200).send(file)
    })
}

const deleteFile = (req, res) => {
    const { id } = req.params
    fileModel.findByIdAndDelete(id, (err, file) => {
        if (err) {
            return res.status(400).send({ message: "Error al eliminar el archivo" })
        }
        if (!file) {
            return res.status(404).send({ message: "Archivo no existe" })
        }
        return res.status(200).send({ message: "Archivo eliminado" })
    })
}

module.exports = {
    uploadNewFile,
    getFiles,
    getSpecificFile,
    getFile,
    deleteFile
}