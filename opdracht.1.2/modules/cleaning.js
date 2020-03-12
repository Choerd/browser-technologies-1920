export function ISBN(books) {
    const cleanBooks = books.map(book => {
        const string = book.isbn[0].replace(/[^0-9]/g, '')
        book.isbn = string
        return book
    })
    return cleanBooks
}