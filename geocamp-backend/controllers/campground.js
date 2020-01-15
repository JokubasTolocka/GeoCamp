const User = require('../models/user');
const Campground = require('../models/campground');

exports.createCampground = async function(req,res,next){
    try{
        let campground = await Campground.create({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            user: req.body.user,
            location: req.body.location
        });
        let foundUser = await User.findById(req.body.user);
        foundUser.campgrounds.push(campground.id);
        await foundUser.save();
        let foundCampground = await Campground.findById(campground._id).populate("user", {
            name: true
        })
        return res.status(200).json(foundCampground);
    }
    catch(err){
        return next(err);
    }
}