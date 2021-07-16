const http = require('http');
const router = require('./router');

const homeController = require('./controllers/home');
const addBreed = require('./controllers/addBreed');
const addCat = require('./controllers/addCat');
const editCat = require('./controllers/editCat');
const shelterCat = require('./controllers/shelterCat')

router.get('/', homeController)
router.get('/add-breed', addBreed)
router.get('/add-cat', addCat)

router.post('/add-breed', addBreed);
router.post('/add-cat', addCat)

const PORT =  process.env.PORT || 3000;
const server = http.createServer(requestHandler)

function requestHandler(req, res){
    const url = new URL(req.url, 'http://localhost')

    if (req.url.startsWith('/edit/')){
        return editCat(req, res)
    } else if (req.url.startsWith('/delete/')){
        return shelterCat(req, res)
    } else {
        const handler = router.match(req.method, url.pathname)   
        handler(req, res)
    }
}

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))