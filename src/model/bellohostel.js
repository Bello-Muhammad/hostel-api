const mongoose = require('mongoose')

const belloSchema = new mongoose.Schema({
    hostName: {
        type:String,
        default: "Bello Muhammad Bello"
    },
    roomNumber: {
        type: Number
    },
    full: String,
    roomies: [
        

    ],
})


const Bello = mongoose.model('Bellos', belloSchema)

module.exports = Bello