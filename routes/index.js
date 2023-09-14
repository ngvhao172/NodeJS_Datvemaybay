const flightRoute = require('./flights')
const siteRoute = require('./sites')
const airlineController = require('../controllers/AirlineController');
const airportController = require('../controllers/AirportController');

function initRoute(app) {
    // [GET,POST,PUT,....] Get flights
    app.use('/select-flight',flightRoute);

    // [GET] home page
    app.use('/',siteRoute); 
}
module.exports =  initRoute ;