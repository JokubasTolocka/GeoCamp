const express = require('express');
const router = express.Router({mergeParams: true});

const {createCampground} = require('../controllers/campground');
const {requireSignin} = require('../controllers/auth');

router.route('/users/:user_id/new').post(requireSignin, createCampground);

module.exports = router;