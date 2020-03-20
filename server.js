const express = require('express')
const bodyParser = require('body-parser')
const generator = require('generate-password')
const port = process.env.PORT || 4000
const urlencodedParser = bodyParser.urlencoded({ extended: true })
const app = express()

// Static assets folder
app.use(express.static('static'))

// Declare template engine and path
app.set('view engine', 'ejs')
app.set('views', 'templates')

// Exported functions
const storage = require('./modules/storage.js')

// Routes
app
    .get('/', (req, res) => res.render('home'))

    .get('/generate-user-code', (req, res) => {
        const userid = generateUserID()
        res.render('generate-user-code', {
            userid
        })
    })

    .get('/use-user-code', (req, res) => res.render('use-user-code'))
    .post('/use-user-code', urlencodedParser, (req, res) => {
        checkUsers(req.body)
        res.render('personal')
    })

    .get('/about-you', (req, res) => res.render('about-you'))
    .post('/about-you', urlencodedParser, (req, res) => {
        storage.setup(req.body)
        res.render('about-you')
    })

    .get('/personal', (req, res) => res.render('personal'))
    .post('/personal', urlencodedParser, (req, res) => {
        storage.addDataToArray(req.body, 'about-you')
        res.render('personal')
    })

    .get('/nutrition', (req, res) => res.render('nutrition'))
    .post('/nutrition', urlencodedParser, (req, res) => {
        storage.addDataToArray(req.body, 'personal')
        res.render('nutrition')
    })

    .get('/money', (req, res) => res.render('money'))
    .post('/money', urlencodedParser, (req, res) => {
        storage.addDataToArray(req.body, 'nutrition')
        res.render('money')
    })

    .get('/conclusion', (req, res) => res.render('conclusion'))
    .post('/conclusion', urlencodedParser, (req, res) => {
        storage.addDataToArray(req.body, 'money')
        res.render('conclusion')
    })

app.listen(port, () => console.log(`Example app listening on port ${port}`))

function checkUsers(input) {
    const json = readFromJson()
    const existingUser = json.find(user => user.id === input.usercode)

    if (existingUser) {
        console.log('bestaat')
    } else {
        console.log('bestaat niet')
    }
}

function generateUserID() {
    return generator.generate({
        length: 6,
        numbers: true,
        uppercase: true
    })
}