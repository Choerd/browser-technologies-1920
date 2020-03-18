require('dotenv').config()
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

app.listen(port, () => console.log(`Example app listening on port ${port}`))