if (document.querySelector('[survey]')) {
    const inputs = nodeListToArray(document.querySelector('[survey]').querySelectorAll('input:not([type=hidden])'))

    blurEvent(inputs)
}

function nodeListToArray(nodeList) {
    let array = []
    for (const node of nodeList) {
        array.push(node)
    }
    return array
}

function blurEvent(inputs) {
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            if (input.type === 'text' && !input.pattern.includes('[0-9]')) {
                console.log('text', input)
            }
            if (input.type === 'radio') {
                console.log('radio', input)
            }
            if (input.type === 'text' && input.pattern.includes('[0-9]')) {
                console.log('number', input)
            }
            if (input.type === 'tel') {
                console.log('tel', input)
            }
            if (input.type === 'email') {
                console.log('mail', input)
            }
            if (input.type === 'color') {
                console.log('color', input)
            }
            if (input.type === 'range') {
                console.log('range', input)
            }
        })
    })
}