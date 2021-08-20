const {Schema, model} = require('mongoose');

const schema = new Schema({
    username: {type: String, required: [true, 'All fields are required']},
    hashedPassword: {type: String, required: true},
    likedPlays: [{type: Schema.Types.ObjectId, ref: 'Play'}]
})

module.exports = model('User', schema);