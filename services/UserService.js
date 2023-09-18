const User = require('../models/User');
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
    createUser(email, last_name, first_name, password, phonenumber, address, dob) {
        const newUser = new User({ email, last_name, first_name, password, phonenumber, address, dob });
      
        return newUser.save()
          .then(() => {
            console.log('Người dùng đã được lưu vào cơ sở dữ liệu.');
          })
          .catch((err) => {
            console.error('Lỗi khi lưu người dùng:', err);
            throw err;
          });
      }
      
}

module.exports = new UserService;