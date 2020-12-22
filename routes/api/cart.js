const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Cart = require('../../models/Cart')

router.get('/', (req, res) => res.send('Cart Route'))

//get contents of cart to display it (accessed through cart page)
//protected route
router.get('/myCart', auth, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id })
        return res.json(cart)
    } catch (err) {
        return res.status(400).json({ errors: [{ msg: 'Server failed getting cart' }] })
    }
})

//change contents of route (accessed through cart page)
//protected route
router.post('/myCart', auth, async (req, res) => {
    try {

    } catch (err) {
        return res.status(400).json({ errors: [{ msg: 'Server failed changing cart' }] })
    }
})

//add product to cart (accessed through product page or home page)
//protected route
router.post('/addToMyCart', auth, (req, res) => {

})

//delete product from cart (accessed through cart page)
//protected route
router.delete('/deleteFromMyCart', auth, (req, res) => {

})

//


module.exports = router;