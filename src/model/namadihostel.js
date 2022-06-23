const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const namadiSchema = new mongoose.Schema({
    hostName: {
        type:String,
        default: "Namadi Sambo"
    },
    roomNumber: {
        type: Number
    },
    full: {
        type: String,
    },
        roomies: [],

})




const Namadi = mongoose.model('Namadi', namadiSchema)

module.exports = Namadi