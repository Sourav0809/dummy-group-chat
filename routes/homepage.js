const express = require('express')
const path = require('path')
const router = express.Router()
const bodyParser = require("body-parser")
const fs = require('fs')
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/', (req, res, next) => {
    console.log("IN THE HOME PAGE MIDDLEWARE ")
    res.sendFile(path.join(__dirname, '../', 'views', 'homepage.html'))


})


router.post('/', (req, res, next) => {
    const userName = req.body.username
    // Send the username back to the client
    res.send(`<script>localStorage.setItem('username', '${userName}'); window.location.href='/message';</script>`);



})
router.get('/message', (req, res, next) => {
    console.log(" in the messages page ")
    fs.readFile('message.txt', 'utf-8', (err, data) => {
        if (err) {
            data = "<h1>No messages .. </h1>"
        }

        const filePath = path.join(__dirname, '../', 'views', 'message.html');
        fs.readFile(filePath, 'utf-8', (err, fileData) => {
            if (err) {
                res.status(500).send('<h1>Internal Server Error</h1>');
                return;
            }

            fileData = fileData.replace('{{userChats}}', data);
            res.send(fileData);
        });
    });
});

router.post('/message', (req, res, next) => {

    fs.appendFile('message.txt', `<h1>${req.body.username} : ${req.body.message}</h1>`, (err) => {
        if (err) {
            res.send('<h1>some error occured !!</h1>')
        }
        else {
            res.redirect('/message')
        }
    })

})




module.exports = router