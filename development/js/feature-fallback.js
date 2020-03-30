function addEventListener() {
    if ('addEventListener' in document && typeof document.body.addEventListener === 'function') {
        return true
    } else {
        return false
    }
}