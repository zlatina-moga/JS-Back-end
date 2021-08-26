const express = require('express');
const expressConfig = require('./config/express')
const dbConfig = require('./config/database')
const routesConfig = require('./config/routes')
const {PORT} = require ('./config')

start();

async function start(){
    const app = express();

    await dbConfig(app);
    expressConfig(app);
    routesConfig(app)

    app.listen(PORT, () => console.log('Application running on port ' + PORT))
}