import * as api from '../modules/data.js'
import * as clean from '../modules/cleaning.js'
import * as render from '../modules/render.js'
import * as template from '../templates/template.js'
import * as helper from '../modules/helperFunctions.js'
import * as interaction from '../modules/interaction.js'

const main = document.querySelector('main')

// Data from Excelsheet ObA
const person = [
    { "inboekdatum": "03/16/2017", "taal": "dut", "genre": "detectiveroman", "jaar_publicatie": "2017", "PPN": "408391588", "ISBN": "9789085923978", "matsrt": "JROM", "inschrijf_datum": "11/28/2012", "woonplaats": "AMSTERDAM", "geslacht": "Mannelijk", "Lener": "23267", "Locatie": "SLV", "lencat": "JGD", "exbarc": "10000037538744", "titel": "Complot op het Schedelslo", "fm": { " auteur": "Stilton" }, "vn": { " auteur": "Geronimo" }, "kast": "B-STIL", "transtype": "Verlenging", "transdat": "01/01/2018", "geboortejaar": "2010", "postcode": "1064" },
    { "inboekdatum": "12/04/2010", "taal": "dut", "genre": "", "jaar_publicatie": "2010", "PPN": "328006041", "ISBN": "9789025857226", "matsrt": "JROM", "inschrijf_datum": "11/28/2012", "woonplaats": "AMSTERDAM", "geslacht": "Mannelijk", "Lener": "23267", "Locatie": "SLV", "lencat": "JGD", "exbarc": "10000022357911", "titel": "Dolfijnen voor Drakeneila", "fm": { " auteur": "Rood" }, "vn": { " auteur": "Lydia" }, "kast": "B-ROOD", "transtype": "Verlenging", "transdat": "01/01/2018", "geboortejaar": "2010", "postcode": "1064" },
    { "inboekdatum": "07/09/2015", "taal": "dut", "genre": "detectiveroman", "jaar_publicatie": "2012", "PPN": "39218396X", "ISBN": "9789085920816", "matsrt": "JROM", "inschrijf_datum": "11/28/2012", "woonplaats": "AMSTERDAM", "geslacht": "Mannelijk", "Lener": "23267", "Locatie": "SLV", "lencat": "JGD", "exbarc": "10000034128790", "titel": "Geheim agent Nul Nul K", "fm": { " auteur": "Stilton" }, "vn": { " auteur": "Geronimo" }, "kast": "B-STIL", "transtype": "Verlenging", "transdat": "01/01/2018", "geboortejaar": "2010", "postcode": "1064" },
    { "inboekdatum": "02/22/2016", "taal": "dut", "genre": "zeeverhaal", "jaar_publicatie": "2016", "PPN": "400902745", "ISBN": "9789085923404", "matsrt": "JROM", "inschrijf_datum": "11/28/2012", "woonplaats": "AMSTERDAM", "geslacht": "Mannelijk", "Lener": "23267", "Locatie": "SLV", "lencat": "JGD", "exbarc": "10000035760126", "titel": "Muis overboord!", "fm": { " auteur": "Stilton" }, "vn": { " auteur": "Geronimo" }, "kast": "B-STIL", "transtype": "Verlenging", "transdat": "01/01/2018", "geboortejaar": "2010", "postcode": "1064" }
]

const genres = [
    { "genre": "dieren" },
    { "genre": "zeeverhaal" },
    { "genre": "racisme" },
    { "genre": "avonturenroman" },
    { "genre": "detective" },
    { "genre": "dokter" }
]

routie({
    '': function () {
        helper.removeDom(main)

        render.htmlWithoutData(template.home, main)
    },
    'orienteren': function () {
        helper.removeDom(main)

        render.html(genres, template.genres, main)
    },
    'genre/:category': async function (category) {
        helper.removeDom(main)
        const booksFromCategory = await api.fetchData(category)
        const cleanedGenreBooks = clean.ISBN(booksFromCategory)

        console.log(cleanedGenreBooks)

        render.html(cleanedGenreBooks, template.genresDetails, main)
    },
    'gerelateerd_boeken': async function () {
        helper.removeDom(main)

        // Books from person
        const yourBooks = await api.getPersonalBooks(person, 'personBooks')
        const cleanedBooks = clean.ISBN(yourBooks)
        render.html(cleanedBooks, template.overviewPersonBook, main)

        console.log(cleanedBooks)

        // Simular books
        const genresOfBooks = helper.filterGenres(yourBooks)
        const booksPerGenre = await api.getBooksFromCategory(genresOfBooks, 'genreBooks')
        const cleanedGenreBooks = clean.ISBN(booksPerGenre)
        const randomizedBooks = helper.shuffleArray(cleanedGenreBooks)
        render.html(randomizedBooks, template.overviewGenreBook, main)

        const personBooks = document.querySelectorAll('.yourBooks article')
        interaction.filterSampleBooks(personBooks)
    },
    ':ISBN': async function (isbn) {
        helper.removeDom(main)

        const yourBooks = await api.getPersonalBooks(person, 'personBooks')
        const cleanedBooks = clean.ISBN(yourBooks)
        const genresOfBooks = helper.filterGenres(yourBooks)
        const booksPerGenre = await api.getBooksFromCategory(genresOfBooks, 'genreBooks')
        const cleanedGenreBooks = clean.ISBN(booksPerGenre)

        const allBooks = cleanedBooks.concat(cleanedGenreBooks)
        const clickedBook = allBooks.filter(book => book.isbn === isbn)

        render.html(clickedBook, template.detailBook, main)

        if (clickedBook == '') {
            const data = await api.fetchData(isbn)
            console.log(data)
            render.html(data, template.detailBook, main)
        }
    }
})