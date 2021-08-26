const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true, minLength: [4, 'Name must be at least 4 characters long.']},
    city: {type: String, required: true, minLength: [3, 'City must be at least 3 characters long.']},
    imageUrl: {type: String, required: true, match: [/^https?/, 'ImageUrl must be a valid URL']},
    rooms: {type: Number, required: true, min: 1, max: 100},
    bookedBy: [{type: Schema.Types.ObjectId, ref: 'User'}],
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('Hotel', schema)