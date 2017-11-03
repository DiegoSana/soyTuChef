var express 				= require('express');
var app                 	= express();
var menuRouter 			    = express.Router();
var passport	          	= require('passport');
var menuController 		    = require('./../controllers/menuController');

// Use the passport package in our application
app.use(passport.initialize());
// pass passport for configuration
require('./../../config/passport')(passport);


// Routes
menuRouter.post('/', passport.authenticate('jwt', { session: false}), menuController.postMenu);
menuRouter.get('/:id', passport.authenticate('jwt', { session: false}), menuController.getMenu);
menuRouter.get('/', passport.authenticate('jwt', { session: false}), menuController.getMenu);
menuRouter.put('/:id', passport.authenticate('jwt', { session: false}), menuController.putMenu);


module.exports = menuRouter;