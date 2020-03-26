const fs = require('file-system')

module.exports = {
    addDataToArray,
    readFromJson,
    setup,
    route
}

function addDataToArray(data, name, route, res) {
    const json = readFromJson()
    const user = json.find(user => user.id === data.userid)
    const index = json.map((o) => o.id).indexOf(user.id)

    json[index][`${name}`] = data

    writeToJson(json)

    if (user[route] != undefined) {
        res.render(route, { userid: data.userid, data: user[route] })
    } else {
        res.render(route, { userid: data.userid, data: '' })
    }

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
    res.render('about-you', { userid: data.usercode, data: '' })
}

function route(req, res, page) {
    const json = readFromJson()
    const user = json.find(user => user.id == req.query.userid)
    const data = user[req.query.page]

    res.render(page, { data: data, userid: data.userid })
}