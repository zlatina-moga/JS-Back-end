const router = require('express').Router();
const { isUser } = require('../middlewares/guards');

router.get('/create',isUser(), (req, res) => {
    res.render('theater/create')
})

router.post('/create', isUser(), async (req, res) => {
    try {
        if (req.body.title == '' || req.body.description == '' || req.body.imageUrl == ''){
            throw new Error('Please fill out all fields')
        }

        const plays = await req.storage.getAllPlays();
        const existing = plays.find(p => p.title == req.body.title)
        if (existing){
            throw new Error('A play with this name already exists')
        }

        const playData = {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            public: Boolean(req.body.public),
            author: req.user._id
        }

        await req.storage.createPlay(playData)
        res.redirect('/')

    } catch (err) {
        console.log('>>>', err.message)
        let errors;

        if (err.errors) {
            errors = Object.values(err.errors).map(e => e.properties.message)
        } else {
            errors = [err.message]
        }

        const ctx = {
            errors,
            playData: {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl
            }
        }

        res.render('theater/create', ctx)
    }
    
})

router.get('/details/:id', isUser(), async (req, res) => {
    try {
        const play = await req.storage.getPlayById(req.params.id)

        play.isAuthor = req.user._id == play.author;;
        play.fan = req.user && play.likedBy.find(u => u._id == req.user._id) && !play.isAuthor;
        play.firstTimer = req.user && !play.fan && !play.isAuthor;

        res.render('theater/details', {play})

    } catch (err) {
        console.log(err.message)
        res.redirect('/')
    }
})

router.get('/edit/:id', isUser(), async (req, res) => {
    const playData = await req.storage.getPlayById(req.params.id);
    res.render('theater/edit', {playData})
})

router.post('/edit/:id', isUser(), async(req, res) => {
    try {
        const play = await req.storage.getPlayById(req.params.id)

        if (play.author != req.user._id) {
            throw new Error('Cannot edit play you did not add')
        }

        await req.storage.editPlay(req.params.id, req.body)
        res.redirect('/play/details/' + req.params.id)
    } catch (err) {
        console.log(err.message)

        const ctx = {
            errors: [err.message],
            playData: {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl
            }
        }

        res.render('theater/edit', ctx)
    }
})

router.get('/delete/:id', isUser(), async (req, res) => {
    try {
        const play = await req.storage.getPlayById(req.params.id)

        if (play.author != req.user._id) {
            throw new Error('Cannot delete play you did not add')
        }

        await req.storage.deletePlay(req.params.id)
        res.redirect('/')
    } catch (err){
        console.log(err.message)
        res.redirect('/play/details/' + req.params.id)
    }
})


module.exports = router;