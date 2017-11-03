var express 			= require('express'); 
var app 				= express();
var request 			= require('request');
var multer 				= require('multer');
var gm 					= require('gm').subClass({imageMagick: true});
var mailer 				= require('express-mailer');

app.set('view engine', 'ejs');
mailer.extend(app, {
  from: 'soytuchefok@gmail.com',
  host: 'smtp.gmail.com', // hostname 
  secureConnection: true, // use SSL 
  port: 465, // port for secure SMTP 
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
  auth: {
    user: 'soytuchefok@gmail.com',
    pass: 'soytuchef22'
  }
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/profile/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname);
  }
});
var upload = multer({
	storage: storage,
	limit: {files: 1, fileSize: 5000},
	fileFilter: function (req, file, cb) {
	    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
	        return cb(new Error('Solo imágenes son aceptadas!'));
	    }
	    cb(null, true);
	}
}).single('avatar');


module.exports.getUsuario = function(req, res) {

	var postData = {
		headers: {"content-type" : "application/json", "authorization" : req.session.token},
		url: 'http://localhost:8080/api/usuarios/'+req.session.uid
	}
	
	request.get(postData,function(error, response, body){
		if (error) throw error;

		var info = JSON.parse(body);

		if(response.statusCode == 200)
		{
			res.render('usuario/perfil.ejs', {title: "SoyTuChef.com", user: info.user});
		}else{
			res.send(body);
		}

	});
	
};

module.exports.postUsuario = function(req, res) {
	var postData = {
		headers: {"content-type" : "application/json"},
		url: 'http://localhost:8080/api/usuarios/',
		body: '{"email":"'+req.body.email+'", "password": "'+req.body.password+'", "nombre":"'+req.body.nombre+'"}'
	}
	
	request.post(postData,function(error, response, body){
		if (error) throw error;

		var info = JSON.parse(body);

		if(response.statusCode == 200)
		{
			app.mailer.send('emails/registration.ejs', {
				to: info.user.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.  
				subject: 'Confirmación de email', // REQUIRED. 
				otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables. 
			}, function (err) {
				if (err) {
				  // handle error 
				  console.log(err);
				  //res.send('There was an error sending the email');
				  //return;
				}
				//res.send('Email Sent');
			});
			res.json({status: true});
		}else{
			res.json(info);
		}

	});
}


module.exports.uploadProfileImg = function(req, res, next) {

	upload(req, res, function(err){
		if(req.file) {
		 	if(err) {
		     	res.status(500).json({status: false, message: "Error al subir la imágen."});
		 	} else {
		        var imagePath = req.file.path;
		        gm(imagePath).resize(80, 80).quality(70).noProfile().write('public/images/profile/80x80/'+req.file.filename, function (err) {
		            if (!err) {
		                gm(imagePath).resize(150, 150).quality(70).noProfile().write('public/images/profile/150x150/'+req.file.filename, function (err) {
		                    if (err)
		                        console.log('Error: '+err);
		                });
		            } else {
		                console.log('Error: '+err);
		            }			
		        });
		        //res.json({status: true, url: req.file.path});
	        }
    	}
		next();
	});

}

module.exports.putUsuario = function(req, res) {

	var data = {};
	for (var key in req.body)
   		data[key] = req.body[key];

	if(req.file) 
		data['image'] = req.file.filename;
	
	if(data) {

		var putData = {
			method: 'PUT',
			headers: {"content-type" : "application/json", "authorization" : req.session.token},
			url: 'http://localhost:8080/api/usuarios/'+req.session.uid,
			json: data
		}

		request(putData,function(error, response, body){
			if (error) throw error;

			if(response.statusCode == 200)
			{
				if(req.file)
					res.json({status: true, url: "public/images/profile/150x150/"+req.file.filename});
				else
					res.json({status: true});
			}else{
				res.json(body);
			}

		});
	} else {
		res.json({status: true});
	}
}

module.exports.deleteUsuario = function(req, res) {

}