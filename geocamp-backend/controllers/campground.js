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

exports.editCampground = async function(req, res, next){
    try{
        let updatedCamp = await Campground.findByIdAndUpdate(req.params.campground_id, {
            location: req.body.center,
            name: req.body.name,
            description: req.body.description,
            image: req.body.image
        });
        await updatedCamp.save();
        // return res.status(200).json(updatedMessage);

        if(res.statusCode >= 200 && res.statusCode <= 300 ) {
        return res.status(200).send("updated successfully");
        } else {
        return next(error);
        }
    } catch(err){
        return next(err);
    }
}