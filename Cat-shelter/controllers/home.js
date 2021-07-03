const {loadTemplate, renderLayout} = require('../template');

module.exports = async(req, res) => {
    const homePage = await loadTemplate('index')
    res.write(await renderLayout(homePage))
    res.end()
}
