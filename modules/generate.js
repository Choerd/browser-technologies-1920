const generator = require('generate-password')

const userid = () => {
    return generator.generate({
        length: 6,
        numbers: true,
        uppercase: true
    })
}

module.exports = {
    userid
}