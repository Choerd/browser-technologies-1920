function checkJavaScriptFeatures() {
    const features = ['querySelectorAll', 'addEventListener']
    const checker = feature => (feature in document && typeof document.body[feature] === 'function')

    return features.every(checker)
}

// Voor documentatie
// function checkFeature() {
//     console.log('addEventListener' in document)
//     console.log(typeof document.body.addEventListener === 'function')
// }