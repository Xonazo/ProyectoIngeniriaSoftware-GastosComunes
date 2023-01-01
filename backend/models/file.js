const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fileSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    nombre: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('file', fileSchema);