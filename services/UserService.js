const User = require('../models/User');
const userVerificationService = require('./UserVerificationService');
const {multipleMongooseToObject} = require('../util/mongoose');
const {mongooseToObject} = require('../util/mongoose');
class UserService{
    getAllUser(){
        return User.find({})
            .then((users) => {
                return multipleMongooseToObject(users);
            })
            .catch((error) => {
                throw error;
            });
    }
    getUserById(id){
        return User.findById(id)
           .then((user) => {
                return mongooseToObject(user);
            })
           .catch((error) => {
                throw error;
            });
    }
    createUser(email, last_name, first_name, password, phonenumber, address, dob, res) {
        const newUser = new User({ email, last_name, first_name, password, phonenumber, address, dob, verified: false });
      
        return newUser.save()
          .then((result) => {
            //success => sending mail
            userVerificationService.sendVerificationEmail(result, res)
          })
          .catch((err) => {
            console.error('Lỗi khi lưu người dùng:', err);
            throw err;
          });
    }
    updateUserStatus(userID){
        User.updateOne({_id: userID, verified: true})
        .then((user)=>{
            return mongooseToObject(user);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
      
}

module.exports = new UserService;