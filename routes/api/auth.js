const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

// router.get('/', auth, (req, res) => res.send('Auth Route'))

router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        return res.json(user)
    } catch (err) {
        return res.status(400).json({ errors: [{ msg: 'Server Error failed simple authentication' }] })
    }
})

//Login User
router.post('/login', [
    check('email', 'Please enter a valid Email').isEmail(),
    check('password', 'Password is Required').exists()
], async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        //keep putting return in front of res, becasue if the processing encounters has multiple res, it will through an error
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
        //Check if user exists
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
        }

        //Match Passwords
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
        }

        //Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get('myToken'),
            { expiresIn: 3600000 },
            (err, token) => {
                if (err)
                    throw err
                return res.json({ token })
            })
    } catch (err) {
        return res.status(404).json({ errors: [{ msg: 'Server failed at login' }] })
    }

})

module.exports = router;