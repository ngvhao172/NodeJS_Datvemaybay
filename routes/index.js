const flightRoute = require('./flights')
const siteRoute = require('./sites')
const airlineController = require('../controllers/AirlineController');
const airportController = require('../controllers/AirportController');

function initRoute(app) {
    // [GET] Get flights
    app.use('/flight',flightRoute);

    // app.get('/airline',airlineController.getAllAirline);

    // app.get('/airport',airportController.getAllAirport);
    // app.get('/airline',async (req,res,next) => {
    //     // console.log()
    //     const airlines = await airline.find({});
    //     res.json(airlines);
    // });

    // [GET] home page

    app.get('/',siteRoute); 
}
module.exports =  initRoute ;