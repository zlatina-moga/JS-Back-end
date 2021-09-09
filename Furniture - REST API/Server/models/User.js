const {Schema, model} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true},
    hashedPassword: {type: String},
    furniture: []
})

module.exports = model('User', schema)