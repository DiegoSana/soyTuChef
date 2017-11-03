var express 				= require('express');
var app                 	= express();
var usuariosRouter 			= express.Router();
var passport	          	= require('passport');
var usuariosController 		= require('./../controllers/usuariosController');

// Use the passport package in our application
app.use(passport.initialize());
// pass passport for configuration
require('./../../config/passport')(passport);


// Routes
usuariosRouter.post('/', usuariosController.postUsuario);
usuariosRouter.get('/:id', passport.authenticate('jwt', { session: false}), usuariosController.getUsuario);
usuariosRouter.put('/:id', passport.authenticate('jwt', { session: false}), usuariosController.putUsuario);


module.exports = usuariosRouter;