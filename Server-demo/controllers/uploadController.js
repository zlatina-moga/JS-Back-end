const fs = require('fs/promises')
const formidable = require('formidable')

module.exports = (req, res) => {
    const form = new formidable.IncomingForm()

    form.parse(req, async (err, fields, files) => {
        console.log(files)
        const filePath = files['uploaded file'].path;
        const name = files['uploaded file'].name;
        const targetPath = './uploads/' + name;

        await fs.rename(filePath, targetPath)

        res.writeHead(301, {
            'Location': '/catalog'
        })
        res.end();
    })
}