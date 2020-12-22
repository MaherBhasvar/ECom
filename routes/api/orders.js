const express = require('express')
const router = express.Router()
const Product = require('../../models/Product')
const Order = require('../../models/Order')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

router.get('/', (req, res) => res.send('Orders Route'))


router.get('/getOrderList', auth, async (req, res) => {

    const user = req.user.id

    try {
        const orders = Order.find({ user })
        return res.json(orders)
    } catch (err) {
        return res.status(404).json({ errors: [{ msg: 'Server failed to get orders' }] })
    }
})

router.post('/createOrder', [
    check('buyNowProductList', 'Product List is Required').not().isEmpty(),
    check('totalAmount', 'Total Amount needs to be a valid number').not().isEmpty()
], auth, async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        //keep putting return in front of res, becasue if the processing encounters has multiple res, it will through an error
        return res.status(400).json({ errors: errors.array() })
    }

    const user = req.user.id

    const { buyNowProductList, address, totalAmount } = req.body

    // console.log("buyNowProductList", buyNowProductList)
    try {
        let amountPayable = 0
        let order = new Order({ user, address })

        let buyProductList = await Promise.all(buyNowProductList.map(async (eachProduct) => {
            try {
                const product = await Product.findOne({ _id: eachProduct._id })
                if (product === null) {
                    return res.status(404).json({ errors: [{ msg: `Product ${product.name} not found on server` }] })
                }
                if (product.displayPrice === null || product.displayPrice < 0) {
                    return res.status(404).json({ errors: [{ msg: `Product ${product.name} does not have valid price on Server` }] })
                }
                // console.log("product", product)
                return ({
                    _id: product.id,
                    productID: product.productID,
                    productName: product.name,
                    quantity: eachProduct.quantity,
                    displayPrice: product.displayPrice,
                    totalPrice: product.displayPrice * eachProduct.quantity
                })
            } catch (err) {
                return res.status(404).json({ errors: [{ msg: 'Server failed at matching Product' }] })
            }
        }))
        // console.log("buyProductList", buyProductList)

        order.buyProductList = await buyProductList

        order.amountPayable = await order.buyProductList.map((eachProduct, index) => eachProduct.totalPrice).reduce((a, b) => a + b, 0)


        if (order.amountPayable !== totalAmount) {
            // console.log("order:", order)
            // console.log("buyProductList", order.buyProductList)
            // console.log("Amount Payable:", order.amountPayable)
            // console.log("Total Amount:", totalAmount)
            return res.status(404).json({ errors: [{ msg: `Some product prices have changed` }] })
        }
        await order.save()

        return res.json(order)

    } catch (err) {
        console.log(err)
        return res.status(404).json({ errors: [{ msg: 'Server failed creating order' }] })
    }

})


//this route is to fill Order Details for Buy Now button on UI
router.get('/product/', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        //Take Price

        //Add Shipping and GST

        //Return Total

    } catch (err) {

    }
})


module.exports = router;