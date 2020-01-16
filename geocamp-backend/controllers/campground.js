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

exports.getCampground = async function(req,res,next){
    try{
        let foundCampground = await Campground.findById(req.params.campground_id).populate("user", {
            name: true
        });
        return res.status(200).json(foundCampground);
    } catch(err){
        return next(err);
    }
}

exports.deleteCampground = async function (req, res, next) {
    try {
        let deletedCampground = await Campground.findByIdAndDelete(req.params.campground_id);
        return res.status(200).json(deletedCampground);
    } catch (err) {
        return next(err);
    }
};