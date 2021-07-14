const fs = require('fs')

module.exports = (req, res) => {
    const pathname = req.url;

    let file;

    if (pathname.startsWith('/content/styles')){
        file = fs.createReadStream(`.${pathname}`)
    } else if (pathname.startsWith('/content/images')){
        file = fs.createReadStream(`.${pathname}`)
    }
    
    let type;

    if(pathname.endsWith('css')){
        type = 'text/css'
    } else if (pathname.endsWith('jpg') || pathname.endsWith('jpeg')){
        type = 'image/jpeg';
    } else if (pathname.endsWith('png')){
        type = 'image/png'
    } else if (pathname.endsWith('ico')){
        type = 'image/x-icon'
    } else {
        type = 'text/plain'
    }
        
    file.on('error', () => {
        res.statusCode = 404;
        res.write('Page not found')
        res.end()
    })

     file.on('data', data => res.write(data))
     file.on('end', () => {
         res.writeHead(200, {
             'Content-Type': type
         });
        res.end()
     })
}
