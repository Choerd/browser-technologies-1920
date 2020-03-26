if (document.querySelector('[survey]')) {
    const inputs = nodeListToArray(document.querySelector('[survey]').querySelectorAll('input:not([type=hidden])'))

    checkInputsOnBlur(inputs)
}

function nodeListToArray(nodeList) {
    let array = []
    for (const node of nodeList) {
        array.push(node)
    }
    return array
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
            if (input.type === 'radio') {
                checkRadioInput(input)
            }
            if (input.type === 'tel') {
                checkTelInput(input)
            }
            if (input.type === 'email') {
                checkEmailInput(input)
            }
            if (input.type === 'color') {
                checkColorInput(input)
            }
            if (input.type === 'range') {
                checkRangeInput(input)
            }
        })
    })
}

function checkTextInput(input) {
    if (input.value.match(/^[A-Za-z]+$/)) {
        console.log('goed')
    }
    else if (input.value.match(/\d+/g)) {
        console.log('numbers')
    }
    else if (input.value === '') {
        console.log('empty')
    }
}

function checkNumberInput(input) {
    if (input.value.match(/^[0-9]+$/)) {
        console.log('goed')
    }
}

function checkRadioInput(input) {
    console.log('radio', input)
}

function checkTelInput(input) {
    console.log('tel', input)
}

function checkEmailInput(input) {
    console.log('email', input)
}

function checkColorInput(input) {
    console.log('color', input)
}

function checkRangeInput(input) {
    console.log('range', input)
}