const loadTemplate = require('../template');
const database = require('../database/cats');

async function shelterCat(req, res){
    const shelterPage = await loadTemplate('catShelter')
    res.write(shelterPage);
    res.end()
}

async function deleteCat(req, res){
    const id = req.url.split('=')[1];
    database.deleteCat(id)

    res.writeHead(301, {
        'Location': '/'
    });
    res.end()
}

module.exports = {
    shelterCat,
    deleteCat
}