const express = require('express')
const bodyParser = require('body-parser')
const fs = require('file-system')
const port = process.env.PORT || 4000
const app = express()

const urlencodedParser = bodyParser.urlencoded({ extended: true })

// Static assets folder
app.use(express.static('static'))

// Declare template engine and path
app.set('view engine', 'ejs')
app.set('views', 'templates')

// Routes
app.get('/', (req, res) => res.render('home'))
app.get('/generate-user-code', (req, res) => res.render('generate-user-code'))
app.get('/use-user-code', (req, res) => res.render('use-user-code'))
app.get('/about-you', (req, res) => res.render('about-you'))

app.get('/personal', (req, res) => res.render('personal'))
app.post('/personal', urlencodedParser, (req, res) => {

    // formdata = req.body
    const data = JSON.stringify(req.body, null, 2)
    fs.writeFileSync('users/data.json', data)

    const read = fs.readFileSync('users/data.json')
    const data2 = JSON.parse(read)
    console.log(data2)


    res.render('personal')
})

// (req, res) => res.render('personal'))

app.get('/nutrition', (req, res) => res.render('nutrition'))
app.get('/money', (req, res) => res.render('money'))
app.get('/conclusion', (req, res) => res.render('conclusion'))

app.listen(port, () => console.log(`Example app listening on port ${port}`))