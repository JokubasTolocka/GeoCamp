const express = require('express');
const router = express.Router();

const {googleLogin, facebookLogin} = require('../controllers/auth');

router.post('/google-login', googleLogin);
router.post('/facebook-login', facebookLogin);

module.exports = router;