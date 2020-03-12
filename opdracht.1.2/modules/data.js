export async function getPersonalBooks(person, name) {
    let books

    if (JSON.parse(localStorage.getItem(name)) === null) {
        // console.log('Data from Fetch')

        const book = person.map(book => fetchData(book.ISBN))
        const rawBooks = await Promise.all(book)

        localStorage.setItem(name, JSON.stringify(rawBooks.flat()))
        books = rawBooks.flat()
    } else {
        // console.log('Data from LocalStorage')

        books = JSON.parse(localStorage.getItem(name))
    }
    return books
}

export async function getBooksFromCategory(categories, name) {
    let books

    if (JSON.parse(localStorage.getItem(name)) === null) {
        // console.log('Data from Fetch')
        console.log('ja')

        const book = categories.map(category => fetchData(category))
        const rawBooks = await Promise.all(book)

        localStorage.setItem(name, JSON.stringify(rawBooks.flat()))
        books = rawBooks.flat()
    } else {
        // console.log('Data from LocalStorage')

        books = JSON.parse(localStorage.getItem(name))
    }
    return books
}

export async function fetchData(query) {
    const cors = 'https://cors-anywhere.herokuapp.com/'
    const endpoint = 'https://zoeken.oba.nl/api/v1/search/?q='
    const key = '1e19898c87464e239192c8bfe422f280'
    const secret = '4289fec4e962a33118340c888699438d'
    const detail = 'Default'
    const url = `${cors}${endpoint}${query}&authorization=${key}&detaillevel=${detail}&output=json`
    const config = {
        Authorization: `Bearer ${secret}`
    }

    document.querySelector('.loading-state').style.display = 'block'

    const response = await fetch(url, config)
    const data = await response.json()

    document.querySelector('.loading-state').style.display = 'none'

    return data.results

}