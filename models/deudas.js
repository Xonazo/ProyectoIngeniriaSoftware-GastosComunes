const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DeudasSchema = new Schema({
    
    idvecino:{
        type: Schema.Types.ObjectId,
<<<<<<< Updated upstream:models/deudas.js
        ref: 'vecino',
        unique: true,
    },
=======
        ref: 'user',
        required: true,
        },
>>>>>>> Stashed changes:backend/models/deudas.js
    deuda:{
        type: Number,
        required: true,
    },
    abono:{
        type: Number,
    }
})


module.exports = mongoose.model('Deudas',DeudasSchema);