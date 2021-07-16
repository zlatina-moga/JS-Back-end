const fs = require('fs/promises');
const path = require('path')
const {loadTemplate, renderLayout} = require('../template');
const createRecord = require('../createCatRecord')

module.exports = async(req, res) => {
    try {
        const catsDataFilePath = path.join(__dirname, '../database/cats.json')
        const catsDataBuffer = await fs.readFile(catsDataFilePath)
        const catsData = JSON.parse(catsDataBuffer).map(createRecord).join('');
        
        let homePage = await loadTemplate('index')
        homePage = homePage.replace(new RegExp('{{cats}}', 'g'), catsData)

        res.write(await renderLayout(homePage))
        res.end()
    } catch (err){
        res.statusCode = 500;
        res.write('Internal server error')
        console.log(err)
        res.end()
    }
    
}
