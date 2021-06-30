const loadTemplate = require('../template');

module.exports = async(req, res) => {
    const addCatPage = await loadTemplate('addCat')
    res.write(addCatPage)
    res.end()
}