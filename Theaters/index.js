const express = require('express');
const {PORT} = require('./config');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');
const databaseConfig = require('./config/database')

start()

async function start(){
    const app = express();
    
    await databaseConfig(app)
    expressConfig(app);
    routesConfig(app)

    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
}
