const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CasaSchema = new Schema({
    numeroVivienda:{
        type: Number,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Casa',CasaSchema);
