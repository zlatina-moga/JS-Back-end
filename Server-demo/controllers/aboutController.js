const {layout, loadTemplate} = require('../template');

module.exports = async (req, res) => {
    const aboutPage = await loadTemplate('about')
    res.write(await layout(aboutPage, 'About'))
    res.end()
}
