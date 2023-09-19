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

route.get('/verify/:userID/:uniqueString', authenticationController.verifyUser);

// GG login

route.get('/auth/google', passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

route.get('/auth/google/callback',authenticationController.checkNotAuthenticated,
    passport.authenticate( 'google', {
        successRedirect: '/',
        failureRedirect: '/login'
}));

// route.get('/auth/google/success',authenticationController.checkNotAuthenticated, siteController.index);

// route.get('/auth/google/failure', (req, res)=> {
//     res.redirect('/login');
// });

route.get('/', siteController.index);



module.exports = route;