const bcrypt = require('bcrypt');
const userVerification = require('../services/UserVerificationService');
const userService = require('../services/UserService');
const UserVerificationService = require('../services/UserVerificationService');
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
            if (user) {
                res.render('pages/authentication/register', {
                    layout: null,
                    error: "Email already exists"
                });
            }
            else {
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
                // Handle the case where verification has expired
                if (expiredAt < Date.now()) {
                    userVerification.delUserVerification(userID);
                } else {
                    const result = await bcrypt.compare(uniqueString, hashedUniqueString);
                    if (result) {
                        const userUpdated = await userService.updateUserStatus(userID);
                        if (userUpdated) {
                            await userVerification.delUserVerification(userID, res);
                            res.render('../views/pages/authentication/verifiedsucess.hbs', { layout: null });
                        }
                        else {
                            res.render('../views/pages/authentication/verifiedfail.hbs', { layout: null });
                        }
                    }
                    else {
                        res.render('../views/pages/authentication/verifiedfail.hbs', { layout: null });
                    }
                }
            }
            else {
                res.render('../views/pages/authentication/verifiedfail.hbs', { layout: null });
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
    showforgotPassword(req, res, next) {
        res.render('../views/pages/authentication/forgotpassword.hbs', { layout: null });
    }
    async forgotPassword(req, res, next) {
        const user = await userService.getUserByEmail(req.body.email);
        if (user) {
            if (user.verified) {
                    await userVerification.sendCodeResetPassword(user, res)
                    res.render('../views/pages/authentication/forgotpassword.hbs', { layout: null, success: "Request has been sent into your email." });
                    // .then((result) => {
                    //     if(result.status == 200){
                    //         res.render('../views/pages/authentication/forgotpassword.hbs', {layout: null, success: "Request has been sent into your email."} );
                    //     }
                    // })
                }
                // else {
                //     res.render('../views/pages/authentication/forgotpassword.hbs', { layout: null, error: "You have sent request before. Please check your email address" });
                // }
            else {
                res.render('../views/pages/authentication/forgotpassword.hbs', { layout: null, error: "Please verify your account first." });
            }
        }
        else {
            res.render('../views/pages/authentication/forgotpassword.hbs', { layout: null, error: "No user found with that email." });
        }
    }

    showChangePassword(req, res, next) {
        res.render('../views/pages/authentication/changepassword.hbs', { layout: null });
    }

    async changePassword(req, res, next) {
        try {
            const { userID, uniqueString } = req.params;
            const userVerify = await userVerification.findByUserId(userID);
            if (userVerify) {
                const { expiredAt, uniqueString: hashedUniqueString } = userVerify;
                // Handle the case where verification has expired
                if (expiredAt < Date.now()) {
                    userVerification.delUserVerification(userID);
                } else {
                    const result = await bcrypt.compare(uniqueString, hashedUniqueString);
                    if (result) {
                        const newPassword = req.body.newPassword;
                        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
                        const userUpdated = await userService.updateUserPassword(userID, hashedNewPassword);
                        if (userUpdated) {
                            await userVerification.delUserVerification(userID, res);
                            res.render('../views/pages/authentication/changepassword.hbs', { layout: null, success: "Change password successfully" });
                        }
                        else {
                            res.render('../views/pages/authentication/changepassword.hbs', { layout: null, error: "Invalid. There was an error" });
                        }
                    }
                    else {
                        res.render('../views/pages/authentication/changepassword.hbs', { layout: null });
                    }
                }
            }
            else {
                res.render('../views/pages/authentication/changepassword.hbs', { layout: null });
            }
        } catch (error) {
            console.error(error);
            next(error);
        }

    }
}

module.exports = new Authentication;
