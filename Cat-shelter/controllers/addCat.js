const path = require('path')
const fs = require('fs/promises')
const generateId = require('../generateID')
const parser = require('../parser')
const {loadTemplate, renderLayout} = require('../template');

module.exports = async (req, res) => {
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
            breedsData.map(breed => `<option value="${breed}">${breed}</option>`)
        );

        res.write(await renderLayout(addCatPage))
        res.end()
    }
    else if (req.method === 'POST'){
        try {
            const data = await parser(req);
            data.id = await generateId();
            catsData.unshift(data)

            await fs.writeFile(catsDataFilePath, JSON.stringify(catsData))
            console.log(`${data.name} cat added`)

            res.writeHead(302, {
                'Location': '/'
            })
            res.end() 
        }  catch(err){
            res.statusCode = 500;
            res.write('Internal server error')
            console.log(err)
            res.end()
        }
    }
}

