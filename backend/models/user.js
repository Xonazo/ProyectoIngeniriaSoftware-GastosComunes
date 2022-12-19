const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
        unique: true,
        requiered: true
    },
    personasConvive:{
        type: Number,
        required: true
    },
    role:{
        type:String,
        required: true,
        enum:[
            'admin',
            'user'
        ]
    }
})
module.exports = mongoose.model('User',UserSchema);

