const { Minkey } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RegistroSchema = new Schema({

    regidVecino: {
        type: Schema.Types.ObjectId,
        ref: 'Vecino',
        required: true,
    },

    fechaRegistro:{
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
            'pago a tiempo',
            'pago con atraso',
            'pago abono'
        ]
    }

})

//a
module.exports = mongoose.model('Registro' , RegistroSchema);