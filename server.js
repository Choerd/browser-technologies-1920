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
    .post('/use-user-code', urlencodedParser, (req, res) => checkUser(req.body, res))
    .post('/about-you', urlencodedParser, (req, res) => storage.setup(req.body, res))
    .post('/personal', urlencodedParser, (req, res) => storage.addDataToArray(req.body, 'about-you', 'personal', res))
    .post('/nutrition', urlencodedParser, (req, res) => storage.addDataToArray(req.body, 'about-you', 'nutrition', res))
    .post('/money', urlencodedParser, (req, res) => storage.addDataToArray(req.body, 'about-you', 'money', res))
    .post('/conclusion', urlencodedParser, (req, res) => storage.addDataToArray(req.body, 'about-you', 'conclusion', res))

app.listen(port, () => console.log(`Example app listening on port ${port}`))


function checkUser(input, res) {
    getUser(input) ? renderNewRoute(input, res) : res.redirect('/generate-user-code')
}

function getUser(input) {
    const json = storage.readFromJson()
    return json.find(user => user.id == input.userid)
}

function renderNewRoute(input, res) {
    const existingUser = getUser(input)
    let unanswerdCategories = []

    if (existingUser) {
        const allcategories = ['about-you', 'personal', 'nutrition', 'money', 'conclusion']

        allcategories.forEach(category => {
            if (!(category in existingUser)) {
                unanswerdCategories.push(category)
            }
        })
    }

    res.render(unanswerdCategories[0], { userid: existingUser.id })
}

function generateUserID() {
    return generator.generate({
        length: 6,
        numbers: true,
        uppercase: true
    })
}