const User = require('../models/user');
const Campground = require('../models/campground');
const Rating = require('../models/rating');

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

exports.postRating = async function(req,res,next){
    try{
        Rating.findOne({user: req.params.current_id, campground: req.params.campground_id}).exec(async function(err, rating){
            if(rating){
                console.log('found');
                await rating.updateOne({rating: req.body.rating});
                let AllRatings = await Rating.find({campground: req.params.campground_id})
                let SumRating = 0;
                for(var i = 0; i< AllRatings.length; i++){
                    SumRating = SumRating + AllRatings[i].rating;
                }
                let AvgRating = Math.floor(SumRating / AllRatings.length);
                let foundCamp = Campground.findById({_id: req.params.campground_id});
                await foundCamp.updateOne({AvgRating});
                return res.status(200).json({
                    message: "Rating updated successfully"
                });
            } else{
            let newRating = await Rating.create({
                rating: req.body.rating,
                user: req.params.current_id,
                campground: req.params.campground_id
            });
            let foundUser = await User.findById(req.params.current_id);
            foundUser.ratings.push(newRating.id);
            await foundUser.save();
            let foundCamp = await Campground.findById(req.params.campground_id);
            foundCamp.ratings.push(newRating.id);
            await foundCamp.save();

            //calculating the average
            let AllRatings = await Rating.find({campground: req.params.campground_id})
            let SumRating = 0;
            for(var i = 0; i< AllRatings.length; i++){
                SumRating = SumRating + AllRatings[i].rating;
            }
            let AvgRating = Math.floor(SumRating / AllRatings.length);
            await foundCamp.updateOne({AvgRating, $inc: {ratingCount: 1}});
            return res.status(200).json({
                message: "Rating posted successfully"
            });
            }
        })
    } catch(err) {
        return next(err);
    }
}