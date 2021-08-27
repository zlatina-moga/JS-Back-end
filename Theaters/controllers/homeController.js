const router = require('express').Router();

router.get('/', async (req, res) => {
    const plays = await req.storage.getAllPlays();
    const topPlays = await req.storage.getTopPlays()
    res.render('home', {plays, topPlays}) 
})

router.get('/sort-by-date', async (req, res) => {
    const plays = await req.storage.getPlaysByDate()
    res.render('home', {plays})
})

router.get('/sort-by-likes', async (req, res) => {
    const plays = await req.storage.getPlaysByLikes()
    res.render('home', {plays})
})

module.exports = router;