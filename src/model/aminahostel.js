const mongoose = require('mongoose')

const aminaSchema = new mongoose.Schema({
    hostName: {
        type:String,
        default: "Amina Bello"
    },
    roomNumber: {
        type: Number
    },
    full: {
        type: String,
    },
        roomies: [],

})




const Amina = mongoose.model('amina', aminaSchema)

module.exports = Amina