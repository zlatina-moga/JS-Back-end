const path = require('path')
const fs = require('fs/promises')
const {loadTemplate, renderLayout} = require('../template');

module.exports = async(req, res) => {
    const catsDataFilePath = path.join(__dirname, '../database/cats.json')
    const breedsDataFilePath = path.join(__dirname, '../database/breeds.json')

    const catsDataBuffer = await fs.readFile(catsDataFilePath);
    const breedsDataBuffer = await fs.readFile(breedsDataFilePath);

    const catsData = JSON.parse(catsDataBuffer);
    const breedsData = JSON.parse(breedsDataBuffer);

    if (req.method === 'GET'){       
        let addCatPage = await loadTemplate('addCat')
        addCatPage = addCatPage.replace(
            new RegExp('{{options}}', 'g'), 
            breedsData.map(breed => `<option value="${breed}">${breed}</option>`))

        res.write(await renderLayout(addCatPage))
        res.end()
    } 
}

