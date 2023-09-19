const GoogleStrategy = require('passport-google-oauth2').Strategy;
const userController = require('../services/UserService');
const bcrypt = require('bcrypt');

async function initializeGooglePassport(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`,
        passReqToCallback: true
    },
    async function (request, accessToken, refreshToken, profile, done) {
        const user = await userController.getUserByEmail(profile.email);

        if (user) {
            return done(null, user);
        } else {
            console.log(profile);
            const newUser = {
                email: profile.email, 
                last_name: profile.name.familyName, 
                first_name: profile.name.givenName, 
                password: null, 
                phonenumber: null, 
                address: null, 
                dob: null,
                picture: profile.picture,
                verified: true
            };
            const user = await userController.createUserGG(newUser);
            return done(null, user);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        return done(null, user);
    });
}

module.exports = initializeGooglePassport;
