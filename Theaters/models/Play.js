const {Schema, model} = require('mongoose');

const schema = new Schema({
    title: {type: String, required: true}, //add unique validation
    description: {type: String, required: true, maxLength: [50, 'Description cannot exceed 50 characters']},
    imageUrl: {type: String, required: true, match:[/^https?/, 'Image must be valid URL']},
    public: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    likedBy: [{type: Schema.Types.ObjectId, ref: 'User'}],
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    likes: {type: Number}
})

module.exports = model('Play', schema)