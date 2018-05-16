const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 5, (err, hash) => {
        if (err) {
            return next(err)
        } else {
            this.password = hash;

            return next();
        }
    })
})

userSchema.methods.isPasswordValid = function (guessedPassword) {
    return bcrypt.compare(guessedPassword, this.password)
}

module.exports = mongoose.model('User', userSchema, 'users');