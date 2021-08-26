const router = require('express').Router();
const { isUser } = require('../middlewares/guard');

router.get('/create', isUser(), (req, res) => {
    res.render('create')
})

router.post('/create', isUser(), async (req, res) => {
    try {
        const existingHotelName = await req.storage.getHotelByName(req.body.name)

        if (existingHotelName){
            throw new Error('This hotel name already exists')
        }

        const hotelData = {
            name: req.body.name,
            city: req.body.city,
            rooms: req.body.rooms,
            imageUrl: req.body.imageUrl,
            owner: req.user._id
        }

        await req.storage.createHotel(hotelData)
        res.redirect('/')
    } catch (err) {
        console.log(err.message)
        const ctx = {
            errors: [err.message],
            hotelData: {
                name: req.body.name,
                city: req.body.city,
                rooms: req.body.rooms,
                imageUrl: req.body.imageUrl
            }
        }
        res.render('create', ctx)
    }
})

router.get('/details/:id', isUser(), async (req, res) => {
    try {
        const hotel = await req.storage.getHotelById(req.params.id);

        hotel.isOwner = req.user && req.user._id == hotel.owner;
        hotel.guest = req.user && hotel.bookedBy.find((g) => g._id == req.user._id);
        hotel.firstTimeGuest = req.user._id != hotel.owner && !hotel.guest;

        res.render('details', {hotel})
    } catch (err) {
        console.log(err.message)
        res.redirect('/')
    }
})

router.get('/edit/:id', isUser(), async (req, res) => {
    try {
        const hotel = await req.storage.getHotelById(req.params.id);

        if (hotel.owner != req.user._id){
           throw new Error('Cannot edit unless you have added the hotel')
        }
        res.render('edit', {hotel})
    } catch (err) {
        console.log(err.message)
        res.redirect('/hotels/details/' + req.params.id)
    }
    
})

router.post('/edit/:id', isUser(), async (req, res) => {
    try {
        const hotel = await req.storage.getHotelById(req.params.id);

        if (hotel.owner != req.user._id){
           throw new Error('Cannot edit unless you have added the hotel')
        }

        await req.storage.editHotel(req.params.id, req.body)
        res.redirect('/hotels/details/' + req.params.id)

    } catch (err) {
        console.log(err.message)

        let errors;
        if (err.errors) {
            errors = Object.values(err.errors).map(e => e.properties.message)
        } else {
            errors = [err.message]
        }

        const ctx = {
            errors,
            hotel: {
                name: req.body.name,
                city: req.body.city,
                rooms: req.body.rooms,
                imageUrl: req.body.imageUrl
            }
        }
        res.render('edit', ctx)
    }
})

router.get('/delete/:id', isUser(), async(req, res) => {
    try {
        const hotel = await req.storage.getHotelById(req.params.id);

        if (hotel.owner != req.user._id){
           throw new Error('Cannot delete unless you have added the hotel')
        }

        await req.storage.deleteHotel(req.params.id)
        res.redirect('/')
    } catch (err) {
        console.log(err.message)
        res.redirect('/hotels/details/' + req.params.id)
    }
})

router.get('/book/:id', isUser(), async (req, res) => {
    try {
        const hotel = await req.storage.getHotelById(req.params.id);

        if (hotel.owner == req.user._id){
            throw new Error('Cannot book your own hotel')
        }

        await req.storage.bookHotel(req.params.id, req.user._id)
        res.redirect('/hotels/details/' + req.params.id)

    } catch (err) {
        console.log(err.message)
        res.redirect('/hotels/details/' + req.params.id)
    }
}) 


module.exports = router;