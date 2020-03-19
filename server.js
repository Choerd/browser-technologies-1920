const express = require('express')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: true })
const fs = require('file-system')
const port = process.env.PORT || 4000
const app = express()

const generator = require('generate-password');

// Static assets folder
app.use(express.static('static'))

// Declare template engine and path
app.set('view engine', 'ejs')
app.set('views', 'templates')

// Routes
app
    .get('/', (req, res) => res.render('home'))

    .get('/generate-user-code', (req, res) => {
        const usercode = generator.generate({
            length: 6,
            numbers: true,
            uppercase: true
        })

        res.render('generate-user-code', {
            usercode
        })
    })
    .get('/use-user-code', (req, res) => res.render('use-user-code'))

    .get('/about-you', (req, res) => res.render('about-you'))
    .post('/about-you', urlencodedParser, (req, res) => {
        setup(req.body)
        res.render('about-you')
    })

    .get('/personal', (req, res) => res.render('personal'))
    .post('/personal', urlencodedParser, (req, res) => {
        addDataToArray(req.body, 'about-you')
        res.render('personal')
    })

    .get('/nutrition', (req, res) => res.render('nutrition'))
    .post('/nutrition', urlencodedParser, (req, res) => {
        addDataToArray(req.body, 'personal')
        res.render('nutrition')
    })

    .get('/money', (req, res) => res.render('money'))
    .post('/money', urlencodedParser, (req, res) => {
        addDataToArray(req.body, 'nutrition')
        res.render('money')
    })

    .get('/conclusion', (req, res) => res.render('conclusion'))
    .post('/conclusion', urlencodedParser, (req, res) => {
        addDataToArray(req.body, 'money')
        res.render('conclusion')
    })

app.listen(port, () => console.log(`Example app listening on port ${port}`))

function addDataToArray(data, name) {
    const json = readFromJson()
    json[0][`${name}`] = data
    writeToJson(json)
}

function readFromJson() {
    const readFile = fs.readFileSync('users/data.json')
    return JSON.parse(readFile)
}

function writeToJson(data) {
    const content = JSON.stringify(data, null, 2)
    fs.writeFileSync('users/data.json', content)
}

function setup(data) {
    const json = readFromJson()
    const usercode = data.usercode

    if (json.length === 0) {
        json.push({ 'user-id': usercode })

        const user = JSON.stringify(json, null, 2)
        fs.writeFileSync('users/data.json', user)
    }
    return json
}

function createObject(data, name) {
    return data
}


function readAndWrite(formData, objectName) {
    const object = {
        page: objectName,
        data: formData
    }

    // Writefile
    const userdata = JSON.stringify(object, null, 2)
    fs.writeFileSync('users/data.json', userdata)

    // Readfile
    const readFile = fs.readFileSync('users/data.json')
    const parsedData = JSON.parse(readFile)

    console.log(parsedData)
    return parsedData
}