const express = require('express');
const router = express.Router();  // Correctly create the router instance
const { register,login,logout, findUserById, changeUserPassword,refreshAccessToken} = require('./../controllers/usersController');  // Ensure correct destructuring of `register`
const {validate,signupValidation, loginValidation}=require("./../validation/userValidation");
const authenticateUser=require("./../Middleware/authMiddleware");

// Define the route and attach the register controller
router.route('/login')
    .get(validate(loginValidation()),login)
    .post(validate(loginValidation()),login);
router.get('/getUser/:userId', authenticateUser,findUserById);

router.route("/logout")
.get(authenticateUser,logout)
.post(authenticateUser,logout);

router.route('/change-password')
.post(authenticateUser,changeUserPassword)
.get(authenticateUser,changeUserPassword);

router.route('/refresh-token')
.get(refreshAccessToken)
.post(refreshAccessToken);



module.exports = router;