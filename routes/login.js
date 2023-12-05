const express = require('express')
const path = require('path')
const router = express.Router()
const bodyParser = require("body-parser")


router.get('/login', (req, res, next) => {
    console.log("IN THE LOGIN PAGE MIDDLEWARE ")
    res.sendFile(path.join(__dirname, '../', 'views', 'login.html'))


})


module.exports = router