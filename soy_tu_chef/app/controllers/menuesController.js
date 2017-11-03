var express 			= require('express'); 
var app 				= express();
var request 			= require('request');

module.exports.getMenues = function(req, res) {

	if(req.params.id) {
		var postData = {
			headers: {"content-type" : "application/json", "authorization" : req.session.token},
			url: 'http://localhost:8080/api/menu/'+req.params.id
		}
		
		request.get(postData,function(error, response, body){
			if (error) throw error;

			var body = JSON.parse(body);
			if(response.statusCode == 200)
			{
				res.render('menu/edit.ejs', {title: "SoyTuChef.com", status: true, menu: body.menu});
			}else{
				res.render('menu/edit.ejs', {title: "SoyTuChef.com", status: false, msg: body.msg});
			}

		});
	} else {
		var postData = {
			headers: {"content-type" : "application/json", "authorization" : req.session.token},
			url: 'http://localhost:8080/api/menu/'
		}
		
		request.get(postData,function(error, response, body){
			if (error) throw error;

			var body = JSON.parse(body);
			if(response.statusCode == 200)
			{
				res.render('menu/misMenues.ejs', {title: "SoyTuChef.com", status: true, menues: body.menues});
			}else{
				res.render('menu/misMenues.ejs', {title: "SoyTuChef.com", status: false, menues: body.menues, msg: body.msg});
			}

		});
	}

}

module.exports.createMenues = function(req, res) {

	res.render('menu/create.ejs', {title: "SoyTuChef.com", status: true});	
}

module.exports.postMenues = function(req, res) {

		var postData = {
			headers: {"content-type" : "application/json", "authorization" : req.session.token},
			url: 'http://localhost:8080/api/menu/',
			body: '{"tipoMenu":"'+req.body.tipoMenu+'", "titulo":"'+req.body.titulo+'"}'
		}

		request.post(postData,function(error, response, body){
			if (error) throw error;

			var body = JSON.parse(body);
			if(response.statusCode == 200)
			{
				res.json({title: "SoyTuChef.com", status: true, menues: body.menu});
			}else{
				res.json({title: "SoyTuChef.com", status: false, msg: body.msg});
			}

		});

}

module.exports.putMenues = function(req, res) {

		var data = {};
		for (var key in req.body) {
	   		data[key] = req.body[key];
		}

		var putData = {
			method: 'PUT',
			headers: {"content-type" : "application/json", "authorization" : req.session.token},
			url: 'http://localhost:8080/api/menu/'+req.params.id,
			body: JSON.stringify(data)
		}

		request(putData,function(error, response, body){
			if (error) throw error;

			var body = JSON.parse(body);
			if(response.statusCode == 200)
			{
				res.json({title: "SoyTuChef.com", status: true, menues: body.menu});
			}else{
				res.json({title: "SoyTuChef.com", status: false, msg: body.msg, error: body.error});
			}

		});

}

module.exports.getMenu = function(req, res) {

}