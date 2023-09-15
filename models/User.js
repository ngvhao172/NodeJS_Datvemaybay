const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({ 
    email: String,
    last_name: String,
    first_name: String,
    password: String,
    google_id: String,
    code: Number,
    phonenumber: String,
    address: String,
    dob: Date,
    role: Number
});

module.exports = mongoose.model('User', User);