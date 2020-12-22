const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../../models/User')


// Test
router.get('/', (req, res) => res.send('User Route'))

//Register User
router.post('/register', [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Please enter a valid Email').isEmail(),
    check('password', 'Please enter a password with six or more characters').isLength({ min: 6 })
], async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        //keep putting return in front of res, becasue if the processing encounters has multiple res, it will through an error
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
        //Check if user exists
        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
        }

        //Get user gravatar
        const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })

        //this does not saves user, it creates an instance of User with following attributes
        user = new User({
            name,
            email,
            avatar,
            password
        })

        //Encrypt password
        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)

        await user.save()

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
        return res.status(404).json({ errors: [{ msg: 'Server failed registering user' }] })
    }

})

module.exports = router;