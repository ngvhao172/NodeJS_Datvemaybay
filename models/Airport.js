const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Airport = new Schema({
  airport_id: Number,
  airport_name: String,
  airport_location: String,
  airport_code: String
});

module.exports = mongoose.model('Airport', Airport);