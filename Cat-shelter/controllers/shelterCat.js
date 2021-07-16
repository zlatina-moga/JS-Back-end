const path = require('path')
const fs = require('fs/promises')
const {loadTemplate, renderLayout} = require('../template');


module.exports = async (req, res) => {
    try {
        const catsDataFilePath = path.join(__dirname, '../database/cats.json')
        const catsDataBuffer = await fs.readFile(catsDataFilePath)
        let catsData = JSON.parse(catsDataBuffer)

        const id = req.url.split('=')[1];
        const index = catsData.findIndex((e) => e.id === id);
        const imageFilePath = path.join(__dirname, '../content/images', catsData[index].image)

        console.log(`${catsData[index].name} just found a new home.`)
        
        catsData[index] = null;
        catsData = catsData.filter(Boolean)

        await fs.rm(imageFilePath)
        await fs.writeFile(catsDataFilePath, JSON.stringify(catsData))
    
        res.writeHead(302, {
            'Location': '/'
        });
        res.end()
    } catch (err){
        res.statusCode = 500;
        res.write('Internal server error')
        console.log(err)
        res.end()
    }
}
