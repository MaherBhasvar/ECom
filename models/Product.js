const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        // required: true
    },
    discount: {
        type: Number,
        // required: true
    },
    displayPrice: {
        type: Number,
        required: true
    }
})

module.exports = Product = mongoose.model('product', ProductSchema)