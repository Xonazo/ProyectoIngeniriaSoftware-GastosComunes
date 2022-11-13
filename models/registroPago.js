const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//e
const registroPago = new Schema({
    rut:{
        type: Schema.Types,
        ref: 'vecino',
        requiered: true
    },
    fechaPago:{
        type: Date,
        required: true
    },
    abono:{
        type: Number,
        required: true
    },
    montoPago:{
        type: Number
    }


})