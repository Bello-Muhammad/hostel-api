const mongoose = require('mongoose')

const hostelSchema = new mongoose.Schema({
    Name: {
        type: String,
    },
    gender: {
        type: String
    },
    roomNumber: {
        type: Number
    }
})

const Hostel = mongoose.model('Hostel', hostelSchema)

module.exports = Hostel