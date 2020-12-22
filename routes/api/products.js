const express = require('express')
const router = express.Router()
const Product = require('../../models/Product')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

//Test Route
router.get('/', (req, res) => res.send('Products Route'))

//Get all products route
//unprotected route
router.get('/all', async (req, res) => {

    try {

        let products = await Product.find()

        if (!products) {
            return res.status(400).json({ errors: [{ msg: 'No Products Found.' }] })
        }
        return res.json(products)
    } catch (err) {
        return res.status(400).json({ errors: [{ msg: 'Server failed returning products' }] })
    }
})

router.get('/getTop10', async (req, res) => {
    try {
        let products = await Product.find().limit(10)
        if (!products) {
            return res.status(400).json({ errors: [{ msg: 'No Products Found.' }] })
        }
        return res.json(products)
    } catch (err) {
        return res.status(400).json({ errors: [{ msg: 'Server failed returning products' }] })
    }
})

//Add product to Database
//Protected Route
//Only to be used by admin
router.post('/add', auth, [
    check('productID', 'Product ID is needed').not().isEmpty(),
    check('name', 'Product Name is needed').not().isEmpty(),
    check('displayPrice', 'Display price cannot be empty').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { productID, name, description, price, discount, displayPrice } = req.body

    try {
        let product = await Product.findOne({ productID })

        if (product) {
            return res.status(400).json({ errors: [{ msg: 'Product already exists' }] })
        }

        product = new Product({
            productID,
            name,
            description,
            price,
            discount,
            displayPrice
        })

        await product.save()

        return res.json(product)

    } catch (err) {
        return res.status(400).json({ errors: [{ msg: 'Server failed adding products' }] })
    }
})

//Route to Delete Product with ProductID
//Protected Route
//Only to be used by admin
router.delete('/delete', auth, (req, res) => {

})


//Route to edit name, description, price, quantity
//Protected Route
//Only to be used by admin
router.post('/edit/', auth, (req, res) => {

})


module.exports = router;