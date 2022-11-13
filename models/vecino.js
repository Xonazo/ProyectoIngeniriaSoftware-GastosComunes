const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//e
const VecinoSchema = new Schema({
    name:{
        type: String,
        required: true,
        minLenght: 1,
        maxLenght: 100
    },
    rut:{
        type: String,
        requiered: true,
        unique : true
    },
    correo:{
        type: String,
        required: true
    },
    numeroVivienda:{
        type: Number,
        required: true,
        unique: true
    },
    deudas:{
        type: Number,
        required: true
    },
    personasConvive:{
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('Vecino',VecinoSchema);

