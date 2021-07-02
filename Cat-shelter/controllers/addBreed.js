const parseForm = require('../formParser')
const loadTemplate = require('../template');
const database = require('../database/breeds')

async function addBreed(req, res){
    const addBreedPage = await loadTemplate('addBreed')
    res.write(addBreedPage)
    res.end()
}

async function createBreed(req, res){
    const body = await(parseForm(req))
    console.log('breed added')

    database.push(body)
        
    res.writeHead(301, {
        'Location': '/'
    })
    res.end() 
}

module.exports = {
    addBreed,
    createBreed
}
