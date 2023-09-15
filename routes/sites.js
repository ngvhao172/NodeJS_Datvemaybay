const express = require('express');
const route = express.Router();
const siteController = require('../controllers/SiteController');
const UserController = require('../controllers/UserController');

route.post('/passenger', siteController.showPassengerInfo);

route.post('/payment-booking', siteController.showPaymentBooking);

route.post('/ticket-info', siteController.showTicket);

route.get('/me/:id', UserController.getUserById);

route.get('/login', UserController.login);

route.post('/login', UserController.loginAccount);

route.post('/logout', UserController.logoutAccount);

route.get('/', siteController.index);


module.exports = route;