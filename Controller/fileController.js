const file = require("../Models/file")

const uploadNewFile = (req, res) =>{
    console.log(req.files)
}

module.exports = {
    uploadNewFile
}