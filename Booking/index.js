const express = require('express');
const { PORT } = require('./config');
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes')

//const userService = require('./services/user');
//const authMiddlware = require('./middlewares/auth')

start()

async function start(){
    const app = express();

    await databaseConfig(app)
    expressConfig(app)
    routesConfig(app)

    app.listen(PORT, () => {
        //isAuth()
        console.log(`Application started at http://localhost:${PORT}`)
    })
}

async function isAuth(){
    //testing the auth middleware
    const reqMock = {};
    const resMock = {
        cookie(){
            console.log('Set cookie', arguments)
        }
    }
    const nextMock = () => {};
    try {
        const auth = authMiddlware()
        auth(reqMock, resMock, nextMock)

        await reqMock.auth.login('John', '123vvv')
    } catch(err){
        console.log('Error: ', err.message)
    }
    /*try { //testing the user service
        const result = await userService.createUser('Peter', '123')
        console.log(result)

        const user = await userService.getUserByUsername('peter')
        console.log(user)
    } catch(err){
        console.log('Error: ', err.message)
    }*/
}