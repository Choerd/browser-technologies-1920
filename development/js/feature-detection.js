function checkJavaScriptFeatures() {
    if (documentChecker() && documentBodyChecker() && documentObjectChecker()) {
        return true
    }
}

function documentChecker() {
    const features = ['querySelectorAll', 'addEventListener']
    const checker = feature => (feature in document && typeof document.body[feature] === 'function')

    return features.every(checker)
}

function documentBodyChecker() {
    const features = ['setAttribute']
    const checker = feature => (feature in document.body && typeof document.body[feature] === 'function')

    return features.every(checker)
}

function documentObjectChecker() {
    const features = ['classList']
    const checker = feature => (feature in document.documentElement && typeof document.body[feature] === 'object')

    return features.every(checker)
}

// Voor documentatie
// function checkAddEventListner() {
//     console.log('addEventListener' in document)
//     console.log(typeof document.body.addEventListener === 'function')
// }
