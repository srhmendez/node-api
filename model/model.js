const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    id : {
        type: Number,
        required: true,
        unique: true
    },
    name : {
        type: String,
        required: true
    },
    complete : {
        type : Boolean,
        required: true,
    },
    category : {
        type : String,
        required: true,
    }
})

const Tododb = mongoose.model('tododb', schema);

module.exports = Tododb;