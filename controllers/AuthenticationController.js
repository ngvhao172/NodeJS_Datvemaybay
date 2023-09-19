const bcrypt = require('bcrypt');
const userVerification = require('../services/UserVerificationService');
const userService = require('../services/UserService');
const { request } = require('express');
class Authentication {

    showLoginPage(req, res, next) {
        res.render('pages/authentication/login', { layout: null });
    }
    showRegisterPage(req, res, next) {
        res.render('pages/authentication/register', { layout: null });
    }
    async registerNewUser(req, res, next) {
        try {
            const {
                email, password, phoneNumber, firstName, lastName
            } = req.body;
            // check if user exists already
            const user = await userService.getUserByEmail(email);
            if(user){
                res.render('pages/authentication/register', {
                    layout: null,
                    error: "Email already exists"
                });
            }
            else{
                const hashedPassword = await bcrypt.hash(password, 10);
                userService.createUser(email, lastName, firstName, hashedPassword, phoneNumber, "", "", res);
            }
            
            // res.redirect("/login");
        } catch (error) {
            console.log(error);
            res.redirect("/register");
        }
    }
    // checkAuthenticated(req, res, next){
    //     if (req.isAuthenticated()) {
    //         next();
    //       }
    //     else{
    //       res.redirect("/login")
    //     }

    // }

    checkNotAuthenticated(req, res, next) {
        console.log(req.user)
        if (req.isAuthenticated()) {
            req.user = req.user;
        }
        next()
    }

    logout(req, res, next) {
        req.logOut(function (err) {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.redirect('/');
        });
    }

    async verifyUser(req, res, next) {
        try {
            const { userID, uniqueString } = req.params;
            const user = await userVerification.findByUserId(userID);
            if (user) {
                const { expiredAt, uniqueString: hashedUniqueString } = user;
                if (expiredAt < Date.now()) {
                    userVerification.delUserVerification(userID);
                    // Handle the case where verification has expired
                } else {
                    const result = await bcrypt.compare(uniqueString, hashedUniqueString);
                    if (result) {
                        const userUpdated = await userService.updateUserStatus(userID);
                        if (userUpdated) {
                            await userVerification.delUserVerification(userID, res);
                            res.render('../views/pages/authentication/verifiedsucess.hbs', {layout: null});
                        }
                        else{
                            res.render('../views/pages/authentication/verifiedfail.hbs', {layout: null});
                        }
                    }
                    else{
                        res.render('../views/pages/authentication/verifiedfail.hbs', {layout: null});
                    }
                }
            }
            else{
                res.render('../views/pages/authentication/verifiedfail.hbs', {layout: null});
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    // isLoggedIn(req,res,next){
    //     if(req.user){
    //         next();
    //     }
    //     res.sendStatus(401);
    // }

}

module.exports = new Authentication;
