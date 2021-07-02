const http = require('http');
const router = require('./router');

const homeController = require('./controllers/home');
const {addBreed, createBreed} = require('./controllers/addBreed');
const {addCat, createCat } = require('./controllers/addCat');
const { deleteCat, shelterCat } = require('./controllers/shelterCat');

router.get('/', homeController)
router.get('/add-breed', addBreed)
router.get('/add-cat', addCat)
router.get('/shelter-cat', shelterCat)

router.post('/add-breed', createBreed);
router.post('/add-cat', createCat)

router.delete('shelter-cat', deleteCat)

const port =  3000;
const server = http.createServer(requestHandler)

function requestHandler(req, res){
    const url = new URL(req.url, 'http://localhost')
    
    const handler = router.match(req.method, url.pathname)   
    handler(req, res)
}

server.listen(port, () => console.log(`Server listening on port ${port}`))