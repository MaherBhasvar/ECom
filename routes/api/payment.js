const express = require('express')
const router = express.Router()
const Razorpay = require('razorpay')
const config = require('config')
const auth = require('../../middleware/auth')
const Order = require('../../models/Order')

router.get('/', (req, res) => res.send('Payment Route'))

// router.post('/orderDetails', auth, async (req, res) => {
//     const { amount } = req.body

//     const instance = new Razorpay({
//         key_id: config.RAZOR_PAY_KEY_ID,
//         key_secret: config.RAZOR_PAY_KEY_SECRET
//     })
// })

const instance = new Razorpay({
    key_id: config.RAZOR_PAY_KEY_ID,
    key_secret: config.RAZOR_PAY_KEY_SECRET,
});

router.post('/razorpayOrder', auth, async (req, res) => {
    try {
        const { orderId, orderAmount } = req.body
        const order = await Order.findOne({ _id: orderId })
        if (order === null) {
            return res.status(404).json({ errors: [{ msg: `Cannot read order` }] })
        }
        if (order.amountPayable !== orderAmount) {
            return res.status(404).json({ errors: [{ msg: `Some product prices have changed` }] })
        }
        const options = {
            amount: order.amountPayable * 100,
            currency: "INR",
            receipt: `${order._id}`,
            // notes: JSON.stringify(order),
            payment_capture: 0,
        };
        instance.orders.create(options, async function (err, order) {
            if (err) {
                console.log(`Something went wrong 1 ${err}`)
                return res.status(404).json({ errors: [{ msg: `Something went wrong 1 ${err}` }] })
            }
            console.log(order.id)

            const dbOrderUpdate = await Order.findOneAndUpdate({ _id: orderId }, { razorpayOrderId: order.id })
            return res.status(200).json(order);
        });
    } catch (err) {
        console.log(`Something went wrong 2 ${err}`)
        return res.status(404).json({ errors: [{ msg: `Something went wrong 2 ${err}` }] })
    }
})

router.post('/capture', auth, async (req, res) => {
    try {
        const { orderId, orderAmount, razorpayOrderId, paymentId } = req.body
        let order = await Order.findOne({ _id: orderId })

        if (order.amountPayable !== orderAmount) {
            return res.status(404).json({ errors: [{ msg: `Some product prices have changed` }] })
        }

        instance.payments.capture(paymentId, order.amountPayable * 100, "INR", async function (err, body) {
            if (err) {
                return res.status(404).json({
                    message: "Something Went Wrong",
                });
            }
            // console.log("Status:", response.statusCode);
            // console.log("Headers:", JSON.stringify(response.headers));
            // console.log("Response:", body);
            console.log(body)
            order = await Order.findOneAndUpdate({ _id: orderId }, {
                razorpayCaptureId: body.id,
                razorpayStatus: body.status,
                orderStatus: 'Pending Delivery',
                paymentSuccess: true
            }, { new: true })
            return res.status(200).json(body);
        })
    } catch (err) {
        return res.status(404).json({
            message: "Something Went Wrong",
        });
    }
})

router.get('/razorpayOrder', auth, async (req, res) => {
    try {
        const options = {
            amount: 1 * 100, // amount == Rs 1
            currency: "INR",
            receipt: "receipt#1",
            payment_capture: 0,
        };
        instance.orders.create(options, async function (err, order) {
            if (err) {
                return res.status(500).json({
                    message: "Something Went Wrong",
                });
            }
            console.log(order.id)
            return res.status(200).json(order);
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something Went Wrong",
        });
    }
})



router.post('/order', auth, async (req, res) => {

    const { orderId, orderAmount } = req.body
    try {
        let order = await Order.findOne({ _id: orderId })
        if (order.amountPayable !== orderAmount) {
            return res.status(404).json({ errors: [{ msg: `Some product prices have changed` }] })
        }

        const options = {
            amount: order.amountPayable * 100,
            currency: "INR",
            receipt: order._id,
            payment_capture: 0
        }

        instance.orders.create(options, async function (err, order) {
            if (err) {
                return res.status(404).json({ errors: [{ msg: 'Something went wrong at Razorpay Server' }] })
            }
            console.log(order)
            return res.status(200).json(order);
        })

    } catch (err) {
        return res.status(404).json({ errors: [{ msg: 'Something went wrong at Server' }] })
    }
})

router.post('/order/capture/:paymentId', auth, async (req, res) => {

    const { orderId, orderAmount } = req.body

    try {
        const order = Order.findOne({ _id: orderId })
        if (order.amountPayable !== orderAmount) {
            return res.status(404).json({ errors: [{ msg: `Some product prices have changed` }] })
        }

        instance.payments.capture(req.params.paymentId, order.amountPayable, "INR", async function (err, body) {
            if (err) {
                return res.status(404).json({ errors: [{ msg: 'Something went wrong at Server' }] })
            }
            // console.log("Status:", response.statusCode);
            // console.log("Headers:", JSON.stringify(response.headers));
            // console.log("Response:", body);
            console.log(body)
            return res.status(200).json(body);
        })
    } catch (err) {
        return res.status(404).json({ errors: [{ msg: 'Something went wrong at Server' }] })
    }
})

router.get('/order', (req, res) => {
    try {
        const options = {
            amount: 1 * 100, // amount == Rs 1
            currency: "INR",
            receipt: "receipt#1",
            payment_capture: 0,
        };
        instance.orders.create(options, async function (err, order) {
            if (err) {
                return res.status(500).json({
                    message: "Something Went Wrong",
                });
            }
            console.log(order.id)
            return res.status(200).json(order);
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something Went Wrong",
        });
    }
})

router.post('/capture/:paymentId', (req, res) => {

    try {
        instance.payments.capture(req.params.paymentId, 100, "INR", async function (err, body) {
            if (err) {
                return res.status(500).json({
                    message: "Something Went Wrong",
                });
            }
            // console.log("Status:", response.statusCode);
            // console.log("Headers:", JSON.stringify(response.headers));
            // console.log("Response:", body);
            console.log(body)
            return res.status(200).json(body);
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something Went Wrong",
        });
    }

    // try {
    //     return request({
    //         method: "POST",
    //         url: `https://${config.RAZOR_PAY_KEY_ID}:${config.RAZOR_PAY_KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
    //         form: {
    //             amount: 1 * 100, // amount == Rs 1 // Same As Order amount
    //             currency: "INR",
    //         },
    //     }, async function (err, response, body) {
    //         if (err) {
    //             return res.status(500).json({
    //                 message: "Something Went Wrong",
    //             });
    //         }
    //         console.log("Status:", response.statusCode);
    //         console.log("Headers:", JSON.stringify(response.headers));
    //         console.log("Response:", body);
    //         return res.status(200).json(body);
    //     });
    // } catch (err) {
    //     return res.status(500).json({
    //         message: "Something Went Wrong",
    //     });
    // }
});



module.exports = router;