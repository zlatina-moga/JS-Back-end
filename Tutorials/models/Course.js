const {Schema, model} = require('mongoose');

const schema = new Schema({
    title: {type: String, required: true, minLength: [4, 'Title should be at least 4 characters']}, //add unique validation
    description: {type: String, required: true, minLength: [20, 'Description should be at least 20 characters long'], maxLength: [50, 'Description should be no more than 50 characters long']},
    imageUrl: {type: String, required: true, match:[/^https?/, 'Image must be valid URL']},
    duration: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    usersEnrolled: [{type: Schema.Types.ObjectId, ref: 'User'}],
    enrolled: {type: Number, default: 0},
    author: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('Course', schema)