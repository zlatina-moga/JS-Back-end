const courseService = require('../services/courseService')

module.exports = () => (req, res, next) => {
    req.storage = {
        ...courseService
    }
    next()
}