const mongoose = require('mongoose');



const adminSchema = new mongoose.Schema({

    firstName : {
        type : String,
        required : true,
        minlength : 2,
        maxlength : 10
    },
    lastName : {
        type : String,
        required : true,
        minlength : 2,
        maxlength : 10
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    mobile : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    profileImage : {
        type : String,
        default : '',
    }
}, {timestamps : true})

module.exports = mongoose.model('admin', adminSchema)