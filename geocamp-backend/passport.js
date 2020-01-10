require('dotenv').config();
const  passport = require('passport'),
       FacebookTokenStrategy = require('passport-facebook').Strategy,
       db = require('./models/index');

passport.use(new FacebookTokenStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "http://localhost:8000/api/user/auth/facebook/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
        db.User.findOne({'facebook_id': profile.id}), function(err, user){
            if(err){
                return done(err);
            }
            if(user){
                return done(null, user);
            }
            else{
                console.log(profile);
                var newUser = db.User.create();
                newUser.facebook_id = profile.id;
                newUser.token = accessToken;
                newUser.displayName = profile.name.givenName + ' ' +profile.name.familyName;

                newUser.save(function(err){
                    if(err){
                        throw err;
                    }
                    return done(null, newUser);
                })
                
            }
        }
    })
  }
));