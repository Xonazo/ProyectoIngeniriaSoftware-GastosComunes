const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HouseSchema = new Schema({
    numeroVivienda: {
        type: Number,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('House', HouseSchema);
