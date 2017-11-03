var express 				= require('express');
var app                 	= express();
var usuariosRouter 			= express.Router();
var usuariosController 		= require('./../controllers/usuariosController');
var autenticacion			= require('./../../config/authentication');


usuariosRouter.get('/', autenticacion.isAuthenticated, usuariosController.getUsuario);
usuariosRouter.post('/', usuariosController.postUsuario);
usuariosRouter.put('/:id', autenticacion.isAuthenticated, usuariosController.uploadProfileImg, usuariosController.putUsuario);
usuariosRouter.delete('/:id', autenticacion.isAuthenticated, usuariosController.deleteUsuario);

module.exports = usuariosRouter;