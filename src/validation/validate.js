const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

const isValidField = (value) => {
    if(typeof value == 'undefined' || typeof value == null) return false;
    else if(typeof value == 'string' && value.trim().length == 0) return false;
    return true; 
}

const isValidObjectId = (id) => {
    if(!objectId.isValid(id))return false;
    else return true;
}

const isValidLength = (val) => {
    return Object.keys(val).length > 0
}



module.exports = {isValidField, isValidObjectId, isValidLength}