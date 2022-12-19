const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DeudasSchema = new Schema({

    idvecino:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true,
        },
    deuda:{
        type: Number,
        required: true,
    },
    abono:{
        type: Number,
    }
})


module.exports = mongoose.model('Deudas',DeudasSchema);