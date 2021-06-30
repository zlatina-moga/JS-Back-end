const loadTemplate = require('../template');

module.exports = async(req, res) => {
    const addBreedPage = await loadTemplate('addBreed')
    res.write(addBreedPage)
    res.end()
}