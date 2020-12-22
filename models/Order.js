const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    amountPayable: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
    },
    paymentSuccess: {
        type: Boolean,
        default: false,
        required: true
    },
    dateCreation: {
        type: Date,
        default: Date.now(),
        required: true
    },
    orderStatus: {
        type: String,
        default: ''
    },
    razorpayOrderId: {
        type: String,
        default: ''
    },
    razorpayStatus: {
        type: String,
        default: ''
    },
    razorpayCaptureId: {
        type: String,
        default: ''
    },
    buyProductList: {
        type: [{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true
            },
            productID: {
                type: String,
                required: true
            },
            productName: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            displayPrice: {
                type: Number,
                required: true
            },
            totalPrice: {
                type: Number,
                required: true
            }
        }],
        required: true
    }

})

module.exports = Order = mongoose.model('order', OrderSchema)