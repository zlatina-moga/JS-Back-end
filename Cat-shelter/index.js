const http = require('http');
const router = require('./router');
const path = require('path')

const homeController = require('./controllers/home');
const addBreed = require('./controllers/addBreed');
const addCat = require('./controllers/addCat');

router.get('/', homeController)
router.get('/add-breed', addBreed)
router.get('/add-cat', addCat)
router.get('/shelter-cat', shelterCat)

router.post('/add-breed', addBreed);

const PORT =  process.env.PORT || 3000;
const server = http.createServer(requestHandler)

function requestHandler(req, res){
    const url = new URL(req.url, 'http://localhost')
    
    const handler = router.match(req.method, url.pathname)   
    handler(req, res)
}

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
