const fs = require('fs/promises');
const path = require('path')
const formidable = require('formidable');

module.exports = async (req) => {
    const form = new formidable.IncomingForm();

    return new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if(err) return reject(err);
    
            if (Object.values(files).length === 0) {
                return resolve(fields);
            } else {
                const filePath = files['upload'].path;
			    const fileName = files['upload'].name;
			    const targetPath = path.join(__dirname, './content/images/', fileName);

			    await fs.rename(filePath, targetPath);
    
                fields.image = fileName;
                resolve (fields);
            }
        })
    })
}