const fs = require('fs')
const loginRoutes = require('./routes/login')
const homepageRoutes = require('./routes/homepage')
const path = require('path')
const bodyParser = require("body-parser")
const express = require('express')
const app = express()




app.use(bodyParser.urlencoded({ extended: false }))
// if user go to the login page
app.use(loginRoutes)
app.use(homepageRoutes)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "./", "views", '404page.html'))
})

app.listen(8000)

