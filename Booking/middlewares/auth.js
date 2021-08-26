const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const { TOKEN_SECRET, COOKIE_NAME } = require('../config')

module.exports = () => (req, res, next) => {
    if (parseToken(req, res)) {
        req.auth = {
            async register(email, username, password) {
                const token = await register(email, username, password)
                res.cookie(COOKIE_NAME, token)
            },
            async login(username, password) {
                const token = await login(username, password)
                res.cookie(COOKIE_NAME, token)
            },
            logout(){
                res.clearCookie(COOKIE_NAME)
            }
        }
        next();
    }
}

async function register(email, username, password){
    const existingUsername = await userService.getUserByUsername(username);
    const existingEmail = await userService.getUserByEmail(email);

    if (existingUsername){
        throw new Error('Username is already taken')
    } else if (existingEmail){
        throw new Error('Email is already taken')
    } else if (password == ''){
        throw new Error('All fields are required')
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createUser(email, username, hashedPassword);

    return generateToken(user)
}

async function login(username, password){
    const user = await userService.getUserByUsername(username);
    const match = await bcrypt.compare(password, user.hashedPassword)

    if (!user || !match){
        throw new Error('Incorrect username or password')
    }

    return generateToken(user)
}

function generateToken(userData){
    return jwt.sign({
        _id: userData._id,
        email: userData.email,
        username: userData.username
    }, TOKEN_SECRET)
}

function parseToken(req, res) {
    const token = req.cookies[COOKIE_NAME];

    if (token) {
        try {
            const userData = jwt.verify(token, TOKEN_SECRET);
            req.user = userData;
            res.locals.user = userData;
            return true
        } catch (err) {
            res.clearCookie(COOKIE_NAME)
            res.redirect('/auth/login')
            return false
        }
    }
    return true;
}