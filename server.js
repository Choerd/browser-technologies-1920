const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000
const urlencodedParser = bodyParser.urlencoded({ extended: true })
const app = express()


const fs = require('file-system')



// Static assets folder
app.use(express.static('static'))

// Declare template engine and path
app.set('view engine', 'ejs')
app.set('views', 'templates')

// Imported functions
const storage = require('./modules/storage.js')
const generate = require('./modules/generate.js')
const user = require('./modules/user.js')

// Routes
app
    .get('/', (req, res) => res.render('home'))
    .get('/generate-user-code', (req, res) => res.render('generate-user-code', { userid: generate.userid() }))
    .get('/use-user-code', (req, res) => res.render('use-user-code'))
    .get('/about-you', urlencodedParser, (req, res) => storage.route(req, res, 'about-you'))
    .get('/personal', urlencodedParser, (req, res) => storage.route(req, res, 'personal'))
    .get('/nutrition', urlencodedParser, (req, res) => storage.route(req, res, 'nutrition'))
    .get('/money', urlencodedParser, (req, res) => storage.route(req, res, 'money'))

    .post('/use-user-code', urlencodedParser, (req, res) => user.check(req.body, res))
    .post('/about-you', urlencodedParser, (req, res) => storage.setup(req.body, res))
    .post('/personal', urlencodedParser, (req, res) => storage.addDataToArray(req.body, 'about-you', 'personal', res))
    .post('/nutrition', urlencodedParser, (req, res) => storage.addDataToArray(req.body, 'personal', 'nutrition', res))
    .post('/money', urlencodedParser, (req, res) => storage.addDataToArray(req.body, 'nutrition', 'money', res))
    .post('/conclusion', urlencodedParser, (req, res) => storage.addDataToArray(req.body, 'money', 'conclusion', res))

    .listen(port, () => console.log(`Example app listening on port ${port}`))