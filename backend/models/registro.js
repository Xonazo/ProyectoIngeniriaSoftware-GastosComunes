const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegistroSchema = new Schema({
    idVecino: {
        type: Schema.Types.ObjectId,
        ref: 'Vecino',
        required: true,
    },

    deudas:{
        type:Number,
        required: true,

    },

    fechaPago:{
        type:Date,
        required: true,
    },

    cantidadPago:{
        type:Number,
        required: true,

    },
    
    pago:{
        type: String,
        required: true,
        maxLength: 25,
        enum: [
            'pago exitoso',
            'pago con atraso'
        ]

    },
    abono:{
        type:Number,
        required: true,
    }

})

//a
module.exports = mongoose.model('Registro' , RegistroSchema);