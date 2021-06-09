const config = require('./config.json')
const http = require('http')
const url = require('url')
const path = require('path');
const fs = require('fs')

const viewsPath = path.resolve(config.viewsDir);
const staticFilesPath = path.resolve(config.staticFilesDir);

const routeMap = {
    '/': '/home/index.html'
}

const mimeTypeMap = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json'
}

function sendFile(res, fullFilePath){

    const fileExt = path.extname(fullFilePath)
    const type = mimeTypeMap[fileExt]

    fs.readFile(fullFilePath, function(err, data) {
        if (err) {
            const {message} = err;
            res.writeHead(500, {
                'Content-Length': Buffer.byteLength(message),
                'Content-Type': 'text/plain'
            }).end(message)
            return;
        }
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(data),
            'Content-Type': type || 'text/plain'
        }).end(data)
    })
}

function httpHandler(req, res){
    const pathname = url.parse(req.url).pathname;

    if (pathname.includes(`/${config.staticFilesDir}/`)) {
        const fullStaticFilePath = path.resolve(pathname.slice(1))
        sendFile(res, fullStaticFilePath)
        return;
    }

    const fileRelativePath = routeMap[pathname];

    if(fileRelativePath == undefined){
        const data = 'Not Found'
        res.writeHead(404, {
            'Content-Length': Buffer.byteLength(data),
            'Content-Type': 'text/plain'
        }).end(data)
        return;
    }

    const fullFilePath = path.join(viewsPath, fileRelativePath);
    sendFile(res, fullFilePath)
}

http.createServer(httpHandler).listen(config.port, () => {
    console.log(`Server is listening on ${config.port}`)
})
