const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileImage: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    camps: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Camp'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;