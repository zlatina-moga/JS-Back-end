const path = require('path');
const fs = require('fs/promises')
const parseForm = require('../formParser')
const {loadTemplate, renderLayout} = require('../template');


module.exports = async (req, res) => {
    if (req.method === 'GET'){
        const addBreedPage = await loadTemplate('addBreed')
        res.write(await renderLayout(addBreedPage))
        res.end()
    } else if (req.method === 'POST'){
        const breedsDataFilePath = path.join(__dirname, '../database/breeds.json')
        const breedsData = await parseForm(req);

        try {
            await fs.writeFile(breedsDataFilePath, JSON.stringify(breedsData.breed))
            console.log('breed added')

            res.writeHead(301, {
                'Location': '/'
            })
            res.end() 
        } catch(err){
            res.statusCode = 500;
            res.end(`Error >>> ${err}`)
        }
    }
}
