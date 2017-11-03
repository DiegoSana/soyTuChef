var express 				= require('express');
var app                 	= express();
var siteRouter 				= express.Router();
var siteController 			= require('./../controllers/siteController');
var autenticacion			= require('./../../config/authentication');

siteRouter.get('/', autenticacion.isAuthenticated, siteController.getSite);
siteRouter.get('/login', siteController.getLogin);
siteRouter.post('/login', siteController.postLogin);

module.exports = siteRouter;