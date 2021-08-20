const PlayModel = require('../models/Play');

async function createPlay(playData){
    const pattern = new RegExp(`^${playData.title}$`, 'i')
    const existing = await PlayModel.findOne({title: {$regex: pattern}})

    if(existing){
        throw new Error(`A play with this name already exists`)
    }

    const play = new PlayModel(playData)

    await play.save()
    return play;
}

async function editPlay(id, playData){
    const play = await PlayModel.findById(id);

    play.title = playData.title;
    play.description = playData.description;
    play.imageUrl = playData.imageUrl;
    play.public = Boolean(playData.public);

    return play.save()
}

async function deletePlay(id){
    return PlayModel.findByIdAndDelete(id)
}

async function getAllPlays(){
    return await PlayModel.find({ public: true}).sort({createdAt: -1}).lean()
}

async function getPlayById(id){
    return await PlayModel.findById(id).populate('usersLiked').lean()
}


module.exports = {
    createPlay,
    editPlay,
    deletePlay,
    getAllPlays,
    getPlayById
}