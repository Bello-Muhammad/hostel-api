const mongoose = require('mongoose')

const khadijaSchema = new mongoose.Schema({
    hostName: {
        type:String,
        default: "Khadija Bello"
    },
    roomNumber: {
        type: Number
    },
    full: {
        type: String,
    },
        roomies: [],

})




const Khadija = mongoose.model('Khadija', khadijaSchema)

module.exports = Khadija