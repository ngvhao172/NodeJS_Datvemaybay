const initializePassport = require("../config/passport-config")
const passport = require("passport")

const User = require('../models/User');

initializePassport(
  passport,
  async (email) => {
    try {
      const user = await User.findOne({ email: email });
      return user;
    } catch (error) {
      console.error('Lỗi khi tìm kiếm người dùng theo email:', error);
      return null;
    }
  },
  async (id) => { 
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.error('Lỗi khi tìm kiếm người dùng theo ID:', error);
      return null;
    }
  }
);

module.exports = initializePassport;