const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/geocamp', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: true
});

module.exports.User = require('./user');