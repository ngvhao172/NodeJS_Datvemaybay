const express = require('express');
const route = express.Router();
const siteController = require('../controllers/SiteController');
const userController = require('../controllers/UserController');
const accessRoute = require('./access')

route.post('/passenger', siteController.showPassengerInfo);

route.post('/payment-booking', siteController.showPaymentBooking);

route.post('/ticket-info', siteController.showTicket);

// route.get('/me/:id', userController.getUserById);
route.use('/', accessRoute);

module.exports = route;