const loadTemplate = require('../template');

module.exports = async(req, res) => {
    const homePage = await loadTemplate('index')
    res.write(homePage)
    res.end()
}