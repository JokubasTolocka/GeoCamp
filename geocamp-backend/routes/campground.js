const express = require('express');
const router = express.Router({mergeParams: true});

const {createCampground, getCampground, deleteCampground, editCampground} = require('../controllers/campground');
const {requireSignin} = require('../controllers/auth');
const {loginRequired, ensureCorrectUser} = require('../middleware/auth');

router.route('/users/:user_id/new').post(requireSignin, createCampground);

router.route('/users/:user_id/campgrounds/:campground_id')
    .get(loginRequired, getCampground)
    .put(loginRequired, ensureCorrectUser, editCampground)
    .delete(loginRequired, ensureCorrectUser, deleteCampground)

module.exports = router;