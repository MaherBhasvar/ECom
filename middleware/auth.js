const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {

    //Get token
    const token = req.header('x-auth-token')

    if (!token)
        return res.status(401).json({ msg: 'Authorisation Denied, Token in empty' })

    //verify token
    try {
        const decoded = jwt.verify(token, config.get('myToken'))
        req.user = decoded.user
        next()
    } catch (err) {
        return res.status(401).json({ msg: 'Authorisation Denied, Token is not verified' })
    }
}