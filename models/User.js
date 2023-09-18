const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({ 
    email: String,
    last_name: String,
    first_name: String,
    password: String,
    google_id: String,
    phonenumber: String,
    address: String,
    dob: Date,
    verified: Boolean
});

module.exports = mongoose.model('User', User);