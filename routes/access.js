const express = require('express');
const route = express.Router();
const passport = require("passport")
const authenticationController = require('../controllers/AuthenticationController');
const siteController = require('../controllers/SiteController');

route.get('/login', authenticationController.showLoginPage);

route.post("/login", authenticationController.checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

route.get('/register', authenticationController.showRegisterPage);

route.post('/register', authenticationController.registerNewUser);

route.post('/logout', authenticationController.logout);

route.get("/verify/:userID/:uniqueString", authenticationController.verifyUser);

route.get('/', siteController.index);



module.exports = route;