const mongoose = require('mongoose');

let schema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
        unique : true
    },
    complete : {
        type : Boolean,
        required : true
    },
    category : {
        type : String,
        required : true  
    }  
})

const tododb = mongoose.model('tododb',schema);

module.exports = tododb;