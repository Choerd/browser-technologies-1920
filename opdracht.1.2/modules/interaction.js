export function filterSampleBooks(articles) {
    let genres = []

    articles.forEach(element => {
        if (element.attributes[1] != undefined) {
            genres.push(element.attributes[1].value)
        }
    })

    articles.forEach(article => {
        const articles = document.querySelectorAll('.sampleBooks article')

        article.addEventListener('click', async function () {
            if (this.getAttribute('recommend') == "on") {
                this.setAttribute('recommend', 'off')

                genres.splice(genres.indexOf(this.getAttribute('genre')), 1)

                articles.forEach(element => {
                    const elementGenre = element.getAttribute('genre')

                    genres.forEach(genre => {
                        if (elementGenre.includes(genre)) {
                            element.setAttribute('genre', genre)
                        }
                    })

                    if (genres.indexOf(element.getAttribute('genre')) > -1) {
                        element.style.display = 'block'
                    } else {
                        element.style.display = 'none'
                    }
                })
            } else if (this.getAttribute('recommend') == "off") {
                this.setAttribute('recommend', 'on')

                genres.push(this.getAttribute('genre'))

                articles.forEach(element => {
                    if (genres.indexOf(element.getAttribute('genre')) > -1) {
                        element.style.display = 'block'
                    } else {
                        element.style.display = 'none'
                    }
                })
            }

            if (this.getAttribute('inactive') == null || this.getAttribute('inactive') == 'false') {
                this.style.opacity = '.3'
                this.setAttribute('inactive', 'true')
            } else if (this.getAttribute('inactive') == 'true') {
                this.style.opacity = '1'
                this.setAttribute('inactive', 'false')
            }
        })
    })
}