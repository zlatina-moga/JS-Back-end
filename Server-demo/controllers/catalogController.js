const layout = require('../views/layout')

const catalogPage = `
<div>
    <h1>Catalog</h1>
    <ul>
        <li>First Item</li>
        <li>Second Item</li>
        <li>Third Item</li>
    </ul>
</div>`;

module.exports = (req, res) => {
    res.write(layout(catalogPage, 'Catalog'))
    res.end()
}