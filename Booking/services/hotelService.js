const Hotel = require ('../models/Hotel');
const User = require('../models/User')

async function createHotel(hotelData){
    const hotel = new Hotel(hotelData)

    await hotel.save()
    return hotel
}

async function editHotel(id, hotelData){
    const hotel = await Hotel.findById(id);

    hotel.name = hotelData.name;
    hotel.city = hotelData.city;
    hotel.rooms = hotelData.rooms;
    hotel.imageUrl = hotelData.imageUrl;

    return hotel.save()
}

async function deleteHotel(id){
    return await Hotel.findByIdAndDelete(id)
}

async function getHotelById(id){
    const hotel = await Hotel.findById(id).populate('bookedBy').lean()
    return hotel;
}

async function getAllHotels(){
    return await Hotel.find({}).lean()
}

async function getHotelByName(name){
    const pattern = new RegExp(`^${name}$`, 'i')
    return await Hotel.findOne({name: {$regex: pattern}})
}

async function bookHotel(hotelId, userId){
    const hotel = await Hotel.findById(hotelId);
    const user = await User.findById(userId)

    hotel.rooms -= 1;
    hotel.bookedBy.push(userId);

    user.reservations.push(hotel.name)

    await user.save()
    return hotel.save()
}

module.exports = {
    createHotel,
    getAllHotels,
    getHotelById,
    editHotel,
    deleteHotel,
    getHotelByName,
    bookHotel
}