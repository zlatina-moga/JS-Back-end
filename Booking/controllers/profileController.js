const router = require('express').Router();

router.get('/:id', async (req, res) => {
    const user = await req.storage.getUserById(req.user._id)
    res.render('profile', {user})
})

module.exports = router;