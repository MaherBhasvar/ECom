const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')

router.get('/', (req, res) => res.send('User Route'))

router.post('/', async (req, res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'maherb1998@gmail.com',
            pass: 'maher19982001'
        }
    });

    console.log(req.body)
    var mailOptions = {
        from: 'maherb1998@gmail.com',
        to: 'maher.daiict@gmail.com',
        subject: '[Equiry Details Received] ' + Date.now(),
        html: `<h1>Equiry Details Received</h1>
            <p>Name: ${req.body.name}</p>
            <p>Phone: ${req.body.phone}</p>
            <p>Email: ${req.body.email}</p>
            <p>Description: ${req.body.description}</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send("SUCCESS")
        }
    });


})

module.exports = router;