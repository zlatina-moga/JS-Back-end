const parseForm = require('../formParser')
const database = require('../database')

module.exports = async (req, res) => {
    const body = await parseForm(req)
    
    console.log('created item')
    database.addItem(body)

    res.writeHead(301, {
        'Location': '/catalog'
    })
    res.end();
}
