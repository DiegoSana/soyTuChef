var express 				= require('express');
var app                 	= express();
var menuesRouter 			= express.Router();
var menuesController 		= require('./../controllers/menuesController');
var autenticacion			= require('./../../config/authentication');


menuesRouter.get('/', autenticacion.isAuthenticated, menuesController.getMenues);
menuesRouter.get('/create', autenticacion.isAuthenticated, menuesController.createMenues);
menuesRouter.get('/:id', autenticacion.isAuthenticated, menuesController.getMenues);
menuesRouter.post('/', autenticacion.isAuthenticated, menuesController.postMenues);
menuesRouter.put('/:id', autenticacion.isAuthenticated, menuesController.putMenues);

module.exports = menuesRouter;