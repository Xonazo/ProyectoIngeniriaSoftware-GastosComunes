const express = require('express')
const fileController = require('../Controller/fileController')
const upload = require('../middlewares/handleMulter')
const fileSize = require('../middlewares/fileSize')

const api = express.Router()

api.post("/file/:archivo/:id", upload.array('archivos'), fileSize, fileController.uploadNewFile)
api.get('/files', fileController.getFiles)
api.get('/file/download/:id', fileController.getSpecificFile)
api.get('/file/:id', fileController.getFile)
api.delete('/file/delete/:id', fileController.deleteFile)

module.exports = api