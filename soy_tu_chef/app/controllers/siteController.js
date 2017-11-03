var request 			= require('request');


module.exports.getSite = function(req, res){
	res.render('site/index.ejs', {title: 'SoyTuChef.com'});
}

module.exports.getLogin = function(req, res){
	res.render('site/login.ejs', {title: 'SoyTuChef.com'});
}

module.exports.postLogin = function(req, res){
	var postData = {
		headers: {"content-type" : "application/json"},
		url: 'http://localhost:8080/api/autenticacion',
		body: '{"email":"'+req.body.email+'", "password": "'+req.body.password+'"}'
	}

	request.post(postData,function(error, response, body){
		if (error) throw error;

		var info = JSON.parse(body);

		if(response.statusCode == 200)
		{
			req.session.token = info.token;
			req.session.uid = info.uid;
			console.log('usuario logueado -> uid: '+info.uid+', token: '+info.token);
			res.json({status: true, message: ''});
			res.end();
		}else{
			res.json(info);
		}

	});
}