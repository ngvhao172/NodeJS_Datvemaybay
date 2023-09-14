const express = require('express');
const route = express.Router();
const siteController = require('../controllers/SiteController');

route.post('/passenger', siteController.showPassengerInfo);

route.post('/payment-booking', siteController.showPaymentBooking);

route.post('/ticket-info', siteController.showTicket);

route.get('/', siteController.index);


module.exports = route;