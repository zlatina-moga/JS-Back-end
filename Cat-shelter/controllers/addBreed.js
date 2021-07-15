const fs = require('fs/promises')
const path = require('path');
const parse = require('../formParser')
const {loadTemplate, renderLayout} = require('../template');


module.exports = async (req, res) => {
    if (req.method === 'GET'){
        const addBreedPage = await loadTemplate('addBreed')
        res.write(await renderLayout(addBreedPage))
        res.end()
    } else if (req.method === 'POST'){
        const breedsDataFilePath = path.join(__dirname, '../database/breeds.json')
        const breedsDataBuffer = await fs.readFile(breedsDataFilePath);
        const breedsData = JSON.parse(breedsDataBuffer);
        let newBreedEntry = (await parse(req)).breed;
        newBreedEntry = newBreedEntry.replace('+', ' ')

        if (breedsData.includes(newBreedEntry)){
            return res.end('Breed already exists') // needs nicer UX formatting
        } else {
            breedsData.push(newBreedEntry)
        }
        
        try {
            await fs.writeFile(breedsDataFilePath, JSON.stringify(breedsData))
            console.log(`${newBreedEntry} breed added`)

            res.writeHead(302, {
                'Location': '/'
            })
            res.end() 
            
        } catch(err){
            res.statusCode = 500;
            res.write('Internal server error')
            console.log(err)
            res.end()
        }
    }
}
