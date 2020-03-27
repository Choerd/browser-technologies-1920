if (checkJavaScriptFeatures()) {
    if (document.querySelector('[survey]')) {
        const inputs = [...document.querySelector('[survey]').querySelectorAll('input:not([type=hidden])')]

        checkInputsOnBlur(inputs)
    }
}

function checkInputsOnBlur(inputs) {
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.type === 'text' && !input.pattern.includes('[0-9]')) {
                checkTextInput(input)
            }
            if (input.type === 'text' && input.pattern.includes('[0-9]')) {
                checkNumberInput(input)
            }
            if (input.type === 'tel') {
                checkTelInput(input)
            }
            if (input.type === 'email') {
                checkEmailInput(input)
            }
        })
    })
}

function checkTextInput(input) {
    if (input.value.match(/^[A-Za-z]+$/)) {
        niceFeedback(input)
    } else if (input.value.match(/\d+/g)) {
        badFeedback(input, 'Whoops! Je hebt hier getallen ingevult, het moet tekst zijn.')
    } else if (input.value === '') {
        emptyFeedback(input, 'Whoops! Je hebt nog niks ingevult.')
    }
}

function checkNumberInput(input) {
    if (input.value.match(/^[0-9]+$/)) {
        niceFeedback(input, '')
    } else if (input.value.match(/^[A-Za-z]+$/)) {
        badFeedback(input, 'Whoops! Je hebt hier tekst ingevult, het moeten getallen zijn!')
    } else if (input.value === '') {
        emptyFeedback(input, 'Whoops! Je hebt nog niks ingevult.')
    }
}

function checkTelInput(input) {
    if (input.value.match(/^[0-9]+$/) && input.value.length > 9) {
        niceFeedback(input)
    } else if (input.value.match(/^[A-Za-z]+$/) || input.value.length < 10) {
        badFeedback(input, 'Whoops! Volgens mij is dit geen telefoonnummer')
    } else if (input.value === '') {
        emptyFeedback(input, 'Whoops! Je hebt nog niks ingevult.')
    }
}

function checkEmailInput(input) {
    if (input.value.includes('@') && input.value.includes('.') && input.value.length > 5) {
        niceFeedback(input)
    } else if (input.value === '') {
        emptyFeedback(input, 'Whoops! Je hebt nog niks ingevult.')
    } else {
        badFeedback(input, 'Whoops! Volgens mij is dit geen email adres')
    }
}

function niceFeedback(input) {
    const label = input.parentElement

    // unset
    label.className = ''
    label.setAttribute('data-message', '')

    // set
    label.classList.add('correct')
}

function badFeedback(input, message) {
    const label = input.parentElement

    // unset
    label.className = ''
    label.setAttribute('data-message', '')

    //set
    label.classList.add('wrong')
    label.setAttribute('data-message', message)
}

function emptyFeedback(input, message) {
    const label = input.parentElement

    // unset
    label.className = ''
    label.setAttribute('data-message', '')

    // set
    label.classList.add('wrong')
    label.setAttribute('data-message', message)
}