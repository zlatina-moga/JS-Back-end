const router = require('express').Router();
const {body, validationResult} = require('express-validator');
const { isGuest } = require('../middlewares/guards');

router.get('/register', isGuest(), (req, res) => {
    res.render('user/register')
})

router.post(
    '/register',
    isGuest(),
    body('username')
        .matches(/^[A-Za-z0-9]*$/).withMessage('Username can consist only of english letters and digits')
        .isLength({min: 3}).withMessage('Username must be at least 3 characters long.'),
    body('password')
        .matches(/^[A-Za-z0-9]*$/).withMessage('Password can consist only of english letters and digits')
        .isLength({min: 3}).withMessage('Password must be at least 3 characters long.'),
    body('rePass').custom((value, {req}) => {
        if (value != req.body.password){
            throw new Error('Passwords don\'t match')
        }
        return true;
    }),
    async (req, res) => {
        const {errors} = validationResult(req)
        try {
            if (errors.length > 0){
                throw new Error(Object.values(errors).map(e => e.msg).join('\n'))
            }

            await req.auth.register(req.body.username, req.body.password)
            res.redirect('/')

        } catch (err){
            console.log(err.message)
            const ctx = {
                errors: err.message.split('\n'),
                userData: {
                    username: req.body.username
                }
            }
            res.render('user/register', ctx)
        }
    }
)

router.get('/login', isGuest(), (req, res) => {
    res.render('user/login')
})

router.post('/login', isGuest(), async (req, res) => {
    try {
        await req.auth.login(req.body.username, req.body.password);
        res.redirect('/')
    } catch(err){
        console.log(err.message)
        const ctx = {
            errors: err.message.split('\n'),
            userData: {
                username: req.body.username,
            }
        }
        res.render('user/login', ctx)
    }
})

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/')
})

module.exports = router;