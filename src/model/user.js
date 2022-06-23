const { default: mongoose } = require('mongoose')
const moogoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    otherName: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        lowercase: true,
    },
    regnumber: {
        type: String,
        unique: true
    },
    level: {
        type: Number,
    },
    phone: {
        type: Number,
    },
    password: {
        type: String
    },
    hostName: {
        type: String
    },
    room: {
        type: Number
    }
})

//userSchema
userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.statics.findByCredentials = async (regnumber, password) => {
    const user = await User.findOne({regnumber})

    if (!user) {
        throw new Error ("invalid Reg. Number")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error ("invalid password")
    }
    return user
}


const User = mongoose.model('user', userSchema);

module.exports = User