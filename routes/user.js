const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router.get("/signup", userController.renderSignUpForm);

router.post("/signup", wrapAsync(userController.signUp));

router.get("/login",userController.renderLoginForm);

router.post("/login", saveRedirectUrl, passport.authenticate("local",{
     failureRedirect: '/login', 
     failureFlash: true}), 
     userController.login);

router.get("/logout",userController.logout);

module.exports = router;