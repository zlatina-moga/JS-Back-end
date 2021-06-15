const express = require('express');
const hbs = require('express-handlebars');
const catalog = require('./controllers/catalog');

const app = express();
const port = 3000;

app.engine('hbs', hbs({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.use(express.static('/static', express.static('static')))

 app.get('/', catalog)

app.listen(port, () => console.log(`Server listening on ${port}`))
