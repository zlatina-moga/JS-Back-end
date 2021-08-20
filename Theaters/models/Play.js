const {Schema, model} = require('mongoose');

const schema = new Schema({
    title: {type: String, required: [true, 'Title required']},
    description: {type: String, required: [true, 'Description required'], maxLength: [50, 'Description must be less than 50 characters long']},
    imageUrl: {type: String, required: true, match:[/^https?/, 'Image must be valid URL']},
    public: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    usersLiked: {type: Schema.Types.ObjectId, ref: 'User'},
    author: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('Play', schema)