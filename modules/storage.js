const fs = require('file-system')

module.exports = {
    addDataToArray,
    readFromJson,
    writeToJson,
    setup
}

function addDataToArray(data, name) {
    const json = readFromJson()
    json[0][`${name}`] = data
    writeToJson(json)
}

function readFromJson() {
    const readFile = fs.readFileSync('users/data.json')
    return JSON.parse(readFile)
}

function writeToJson(data) {
    const content = JSON.stringify(data, null, 2)
    fs.writeFileSync('users/data.json', content)
}

function setup(data) {
    const json = readFromJson()
    json.push({ 'id': data.usercode })
    writeToJson(json)
}