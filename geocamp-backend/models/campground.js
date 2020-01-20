const mongoose = require('mongoose');

const campgroundSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number
        } 
    },
    ratingCount: {
        type: Number,
        default: 0,
        min: 0
    },
    AvgRating: {
        type: Number
    },
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating'
    }]
}, {
    timestamps: true
})

campgroundSchema.pre('remove', async function(next){
    try {
        //find a user
        let user = await User.findById(this.user);
        //remove the id of the message from the messages list
        user.campgrounds.remove(this.id);
        //save that user
        await user.save();
        //return next
        return next();
    } catch(err){
        return next(err);
    }
});

const Campground = mongoose.model('Campground', campgroundSchema);
module.exports = Campground;