const userModel = require('../models/User');

async function createUser(username, hashedPassword){
    const user = new userModel({
        username,
        hashedPassword,
        likedPlays: []
    })

    await user.save();
    return user;
}

async function getUserByUsername(username){
    const pattern = new RegExp(`^${username}$`, 'i')
    const user = await userModel.findOne({username: {$regex: pattern}})
    return user;
}

module.exports = {
    createUser,
    getUserByUsername
}