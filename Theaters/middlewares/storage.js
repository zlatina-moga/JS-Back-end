const playService = require('../services/playService')

module.exports = () => (req, res, next) => {
    req.storage = {
        ...playService
    }
    next()
}