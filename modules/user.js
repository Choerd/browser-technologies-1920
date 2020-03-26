const storage = require('../modules/storage.js')

module.exports = {
    check
}

function check(input, res) {
    getUser(input) ? renderNewRoute(input, res) : res.redirect('/generate-user-code')
}

function getUser(input) {
    const json = storage.readFromJson()
    return json.find(user => user.id == input.userid)
}

function renderNewRoute(input, res) {
    const existingUser = getUser(input)
    let unanswerdCategories = []

    if (existingUser) {
        const allcategories = ['about-you', 'personal', 'nutrition', 'money', 'conclusion']

        allcategories.forEach(category => {
            if (!(category in existingUser)) {
                unanswerdCategories.push(category)
            }
        })
    }
    res.render(unanswerdCategories[0], { userid: existingUser.id, data: '' })
}