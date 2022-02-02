const Play = require('../models/Play');
const User = require('../models/User')

async function getAllPlays(){
    return await Play.find({}).lean()
}

async function getTopPlays(){
    return await Play.find({}).sort({likes: -1}).limit(3).lean()
}

async function getPlayById(id){
    return await Play.findById(id).populate('likedBy').lean()
}

async function createPlay(playData){
    const play = new Play(playData)

    await play.save()
    return play;
}

async function editPlay(id, playData){
    const play = await Play.findById(id)

    play.title = playData.title;
    play.description = playData.description;
    play.imageUrl = playData.imageUrl;
    play.public = playData.public;

    await play.save()
    return play;
}

async function deletePlay(id){
    return await Play.findByIdAndDelete(id)
}

async function likePlay(playId, userId){
    const play = await Play.findById(playId).lean()
    const user = await User.findById(userId)

    play.likedBy.push(userId);
    user.plays.push(playId);

    await user.save();
    return play.save()
}

async function getPlaysByDate(){
    return await Play.find({public: true}).sort({createdAt: -1}).lean()
}

async function getPlaysByLikes(){
    return await Play.find({}).sort({likes: -1}).lean()
}

module.exports = {
    getAllPlays,
    getPlayById,
    createPlay,
    editPlay,
    deletePlay,
    likePlay,
    getTopPlays,
    getPlaysByDate,
    getPlaysByLikes
}
