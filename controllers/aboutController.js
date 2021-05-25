const layout = require('../views/layout')

const aboutPage = `
<div>
    <h1>About us</h1>
    <p>About Page</p>
</div>`;

module.exports = (req, res) => {
    res.write(layout(aboutPage, 'About'))
    res.end()
}