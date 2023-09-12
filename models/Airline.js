const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Airline = new Schema({
  airline_id: Number,
  airline_name: String,
  airline_logo: String
});

module.exports = mongoose.model('Airline', Airline);