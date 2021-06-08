const config = require('./config.json')
const http = require('http')
const url = require('url')
const path = require('path');
const fs = require('fs')

const viewsPath = path.resolve(config.viewsDir)

const routeMap = {
    '/': '/home/index.html'
}

function sendFile(res, relativeFilePath){
    const fullFilePath = path.join(viewsPath, relativeFilePath);
    fs.readFile(fullFilePath, function(err, data) {
        if (err) {
            const {message} = err;
            res.writeHead(500, {
                'Content-Length': Buffer.byteLength(message),
                'Content-Type': 'text/plain'
            }).end(message)
        }
    })
}

function httpHandler(req, res){
    const path = url.parse(req.url).path;
    res.end('Hello')
}

http.createServer(httpHandler).listen(config.port, () => {
    console.log(`Server is listening on ${config.port}`)
})