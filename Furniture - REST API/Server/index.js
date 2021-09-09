const express = require('express');
const mongoose = require('mongoose')
const cors = require ('./middlewares/cors')
const auth = require('./middlewares/auth');
const furnitureController = require('./controllers/furnitureController');
const userController = require('./controllers/userController');

start()

async function start(){
    await new Promise((resolve, reject) => {
        mongoose.connect('mongodb://localhost:27017/furniture-rest', {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        const db = mongoose.connection;
        db.on('error', (err) => {
            console.error('connection error: ', err)
            reject(err)
        });
        db.once('open', function() {
            console.log('Database connected')
            resolve()
        });
    })

    const app = express()

    app.use(cors())
    app.use(auth())
    app.use(express.json())

    app.use('/data/catalog', furnitureController)
    app.use('/users', userController)

    app.listen(5000, () => console.log('REST Service is running on port 5000'))
}

