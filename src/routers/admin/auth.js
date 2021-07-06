const express = require('express');
const { requireSignin } = require('../../common-middleware');
const { signup, signin, signout } = require('../../controller/admin/auth');
const { validateSignupResult,validateSigninResult, isRequestValidated} = require('../../validators/auth')
const router = express.Router();


router.post('/admin/signup',validateSignupResult,isRequestValidated,signup);

router.post('/admin/signin',validateSigninResult,isRequestValidated,signin);
router.post('/admin/signout', signout);

module.exports = router;