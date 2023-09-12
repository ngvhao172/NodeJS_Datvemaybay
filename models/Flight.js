const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Flight = new Schema({
    flight_id: Number,
    airline_id: String,
    departure_airport_id: String,
    arrival_airport_id: String,
    departure_datetime: Date,
    arrival_datetime: Date,
    economy_price: Number,
    business_price: Number
});

module.exports = mongoose.model('Flight', Flight);