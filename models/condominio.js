const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CondominioSchema = new Schema({
    numeroVivienda:{
        type: Number,
        required: true,
        unique: true
    },
    canOcupantes:{
        type: Number,
        required:true
    }
})

module.exports = mongoose.model('Condominio',CondominioSchema);
