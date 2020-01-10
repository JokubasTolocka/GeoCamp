const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    facebook_id:{
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    displayName: {
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