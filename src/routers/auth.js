const express = require('express');
const { signup, signin } = require('../controller/auth');
const router = express.Router();
const { validateSignupResult, validateSigninResult, isRequestValidated} = require('../validators/auth')


router.post('/signup',validateSignupResult,isRequestValidated, signup);

router.post('/signin',validateSigninResult,isRequestValidated,signin);

// router.post('/profile', requireSignin, (req, res)=>{
//     res.status(200).json({
//         user: "ashikur"
//     })
// })

module.exports = router;