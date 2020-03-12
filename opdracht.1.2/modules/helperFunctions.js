export function filterGenres(books) {
    const genres = []

    books.forEach(book => {
        if (book.genres != undefined) {
            let genre = book.genres.toString()
            genres.push(genre)
        }
    })

    const filteredGenres = genres.filter((genre, index) => genres.indexOf(genre) === index)
    return filteredGenres
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array
}

export function removeDom(element) {
    if (element.children.length >= 1) {
        element.innerHTML = ""
    } else {
        // console.log('Nothing to remove')
    }
}