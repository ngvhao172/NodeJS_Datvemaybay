const user = require('../models/User');
const {multipleMongooseToObject} = require('../util/mongoose');
const {mongooseToObject} = require('../util/mongoose');
class UserService{
    getAllUser(){
        return user.find({})
            .then((users) => {
                return multipleMongooseToObject(users);
            })
            .catch((error) => {
                throw error;
            });
    }
    getUserById(id){
        return user.findById(id)
           .then((user) => {
                return mongooseToObject(user);
            })
           .catch((error) => {
                throw error;
            });
    }
    loginAccount(email, password){
        return user.findOne({email: email, password: password})
          .then((user) => {
            if(user){
                return mongooseToObject(user);
            }
            else{
                throw new Error('Không tìm thấy người dùng.');
            }  
            })
          .catch((error) => {
                throw error;
            });
    }
}

module.exports = new UserService;