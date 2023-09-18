const bcrypt = require('bcrypt');
const airportController = require('../controllers/AirportController');
const userService = require('../services/UserService');
class Authentication{

    showLoginPage(req,res,next) {
        res.render('pages/authentication/login', {layout: null});
    }
    showRegisterPage(req, res, next){
        res.render('pages/authentication/register',  {layout: null});
      }
    async registerNewUser(req, res, next){
        try {
          const {
            email,password,phoneNumber,firstName,lastName
          } = req.body;
          const hashedPassword = await bcrypt.hash(password,10);
          userService.createUser(email,lastName,firstName,hashedPassword,phoneNumber,"","");
          res.redirect("/login");
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
    
    checkNotAuthenticated(req, res, next){
        if(req.isAuthenticated()){
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
      
}

module.exports = new Authentication;
