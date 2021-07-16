const fs = require('fs/promises')
const path = require('path');
const parser = require('../parser')
const {loadTemplate, renderLayout} = require('../template');

module.exports = async (req, res) => {
    const catsDataFilePath = path.join(__dirname, '../database/cats.json')
    const breedsDataFilePath = path.join(__dirname, '../database/breeds.json')

    const catsDataBuffer = await fs.readFile(catsDataFilePath);
    const breedsDataBuffer = await fs.readFile(breedsDataFilePath);

    let catsData = JSON.parse(catsDataBuffer);
    let breedsData = JSON.parse(breedsDataBuffer);

    const id = req.url.split('=')[1];

    const target = catsData.find(c => c.id === id);
    const targetIndex = catsData.indexOf(target)

    if (req.method === 'GET'){
        let editPage = await loadTemplate('editCat');

        editPage = editPage.replace(
            new RegExp('{{options}}', 'g'),
            breedsData 
                .filter((breed) => breed !== target.breed)
                .map((breed) => `<option value="${breed}">${breed}</option>`)
        );

        Object.entries(target)
            .map(([key, value]) =>  (
            editPage = editPage.replace(new RegExp(`{{${key}}}`, 'g'), value))
        )
        
        res.write(await renderLayout(editPage))
        res.end()
    }
    else if (req.method === 'POST'){
        try {
            const formData = await parser(req);

            if (formData.image !== target.image && formData.image !== undefined) {
                const currentImgPath = path.join(__dirname, '../content/images', target.image)
                await fs.rm(currentImgPath)
            }

            Object.assign(catsData[targetIndex], formData)
            await fs.writeFile(catsDataFilePath, JSON.stringify(catsData))

            console.log(`${catsData[targetIndex].name} just updated their details.`)

            res.writeHead(302, {
                'Location': '/'
            });
            res.end()

        }  catch (err){
            res.statusCode = 500;
            res.write('Internal server error')
            console.log(err)
            res.end()
        }
            
    }
}