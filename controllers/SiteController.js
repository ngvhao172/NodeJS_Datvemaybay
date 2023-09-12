const airportController = require('../controllers/AirportController');

class SiteController {
    async index(req, res, next) {
        let airports = await airportController.getAllAirport();
        res.render("index", {airports});
    }
}

module.exports = new SiteController;