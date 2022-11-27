const { Minkey } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RegistroSchema = new Schema({

    regidVecino: {
        type: Schema.Types.ObjectId,
        ref: 'user',
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
            'pago con atraso'
        ]
    }

})

module.exports = mongoose.model('Registro' , RegistroSchema);