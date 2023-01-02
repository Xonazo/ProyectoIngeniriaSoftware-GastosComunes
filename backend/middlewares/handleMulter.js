const multer = require('multer');
const fs = require('fs');
const user = require('../models/user');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { id } = req.params
        user.findById(id, (err, user) => {
            if (err) {
                return res.status(400).send({ message: "Error al obtener el usuario" })
            }
            if (!user) {
                return res.status(404).send({ message: "Usuario no existe" })
            }
            const path = './uploads/' + user.name.toString().replace(" ", "_")
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true })
            }
            cb(null, path)
        })
    },
    filename: function (req, file, cb) {
        let fecha = new Date()
        let fechaString = fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear() + "-" + fecha.getHours() + ":" + fecha.getMinutes() + "-" + fecha.getSeconds()
        cb(null, fechaString + "-" + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            console.log("El archivo es una imagen")
        } else {
            console.log("El archivo tiene otra extension")
        }
        cb(null, true)
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

module.exports = upload