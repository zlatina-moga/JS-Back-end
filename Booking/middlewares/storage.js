const hotelService = require('../services/hotelService')
const userService = require('../services/userService')

module.exports = () => (req, res, next) => {
    req.storage = {
        ...hotelService,
        ...userService
    }
   next()
}