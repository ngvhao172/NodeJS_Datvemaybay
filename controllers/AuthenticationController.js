const bcrypt = require('bcrypt');
const userVerification = require('../services/UserVerificationService');
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
          userService.createUser(email,lastName,firstName,hashedPassword,phoneNumber,"","",res);
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

    verifyUser(req,res,next){
      const {userID, uniqueString} = req.params;
      const user = userVerification.findByUserId(userID)
      if(user){
        if(user.length>0){
          const {expiredAt} = user[0];
          const haseduniqueString = user[0].uniqueString;
          if(expiredAt < Date.now()){
            userVerification.delUserVerification(userID);
          }
          else{
            bcrypt.compare(uniqueString, haseduniqueString)
            .then((result)=>{
              if(result){
                const userUpdated = userService.updateUserStatus(userID)
                if(userUpdated){
                  userVerification.delUserVerification(userID)
                  .then(()=>{
                    res.redirect('../views/pages/authentication/verifiedsucess.hbs');
                  })
                }
              }
            })
          }
        }
      }
    }
      
}

module.exports = new Authentication;
