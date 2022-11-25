const express = require('express')
const fileController = require('../Controller/fileController')
const upload = require('../middlewares/handleMulter')
const fileSize = require('../middlewares/fileSize')

const api = express.Router()

api.post("/file/:archivo", upload.array('archivos'),fileSize,fileController.uploadNewFile)

module.exports = api