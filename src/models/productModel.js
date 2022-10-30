const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: true, unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ["sports", "style & fashion", "health", "electronics", "home appliences", "food"]
    },
    productImage: {
        type: String,
        required: true
    },  // s3 link
    deletedAt: {
        type: Date,
        default : null
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamp: true })

module.exports = mongoose.model('product', productSchema)