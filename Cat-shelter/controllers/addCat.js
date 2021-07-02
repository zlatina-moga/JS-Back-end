const parseForm = require('../formParser')
const loadTemplate = require('../template');
const database = require('../database/cats')

async function addCat(req, res){
    const addCatPage = await loadTemplate('addCat')
    res.write(addCatPage)
    res.end()
}

async function createCat(req, res){
    const body = parseForm(req)
    console.log('cat added')

    database.addCat(body)

    res.writeHead(301, {
        'Location': '/'
    })
    res.end()
}

module.exports = {
    addCat,
    createCat
}