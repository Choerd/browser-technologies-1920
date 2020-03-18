const express = require('express')
const port = process.env.PORT || 4000
const app = express()

// Static assets folder
app.use(express.static('static'))

// Declare template engine and path
app.set('view engine', 'ejs');
app.set('views', 'templates');

// Routes
app.get('/', (req, res) => res.render('home'))
app.get('/generate-user-code', (req, res) => res.render('generate-user-code'))
app.get('/use-user-code', (req, res) => res.render('use-user-code'))
app.get('/about-you', (req, res) => res.render('about-you'))
app.get('/personal', (req, res) => res.render('personal'))
app.get('/nutrition', (req, res) => res.render('nutrition'))
app.get('/money', (req, res) => res.render('money'))
app.get('/conclusion', (req, res) => res.render('conclusion'))

app.listen(port, () => console.log(`Example app listening on port ${port}`))