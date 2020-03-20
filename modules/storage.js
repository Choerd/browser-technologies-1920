const fs = require('file-system')

module.exports = {
    addDataToArray,
    setup
}

function addDataToArray(data, name, route, res) {
    const json = readFromJson()
    const user = json.find(user => user.id === data.userid)
    const index = json.map((o) => o.id).indexOf(user.id)

    json[index][`${name}`] = data
    writeToJson(json)

    res.render(route, { userid: data.userid })
}

function readFromJson() {
    const readFile = fs.readFileSync('data/users.json')
    return JSON.parse(readFile)
}

function writeToJson(data) {
    const content = JSON.stringify(data, null, 2)
    fs.writeFileSync('data/users.json', content)
}

function setup(data, res) {
    const json = readFromJson()
    json.push({ 'id': data.usercode })
    writeToJson(json)
    res.render('about-you', { userid: data.usercode })
}