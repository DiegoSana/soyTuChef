var User                	= require('./../models/usuario');
var Direccion               = require('./../models/direccion');
var path        			= require('path');
var fs          			= require('fs');


module.exports.getUsuario = function(req, res){
	if (req.user._id) {
		User.findById(req.user._id, function(err, user) {
	    	if (err) throw err;

	    	if (!user) {
    			return res.status(403).send({success: false, msg: 'Falló la autenticación. Usuario no encontrado.'});
	    	} else {
	      		res.json({success: true, msg: 'Bienvenido a la zona restringida ' + user.nombre + '!', user: user});
	    	}
		});
	} else {
		return res.status(403).send({success: false, msg: 'Token no provisto.'});
	}

};
module.exports.postUsuario = function(req, res){

		var newUser = new User({
	  		nombre: req.body.nombre,
	  		password: req.body.password,
	  		email: req.body.email,
	  		descripcion: req.body.descripcion,
	  		web: req.body.web,
	  		facebook: req.body.facebook,
	  		instagram: req.body.instagram
		});
		newUser.save(function(err) {
	  		if (err) {
	    		res.status(403).json({success: false, msg: err});
	  		}else{
	  			console.log('Usuario creado! '+newUser._id);
	  			res.json({success: true, msg: 'Usuario creado.', user: newUser});
	  		}
		});

};
module.exports.putUsuario = function(req, res){

    if (req.user._id) {
		User.findById(req.user._id, function(err, user) {
	    	if (err) throw err;

	    	if (!user) {
    			return res.status(403).send({success: false, msg: 'Falló la autenticación. Usuario no encontrado.'});
	    	} else {

				for (var key in req.body)
					if(req.body[key])
			   			user[key] = req.body[key];
			   		else
			   			user[key] = null;

			   	user.save(function(err){
		          	if (err) {
		            	res.status(403).json({success: false, msg: err});
		          	} else {
		          		res.json({success: true, msg: 'Usuario actualizado.'});
		          	}
			   	});
	      		
	    	}
		});
       	
    } else {
		return res.status(403).send({success: false, msg: 'Token no recibido.'});
	}

};