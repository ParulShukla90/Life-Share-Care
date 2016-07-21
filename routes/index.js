module.exports = function(app, express, passport) {
	var router = express.Router();
	var middleware = require("./../app/policies/auth");

	var path = require('path');
	
	router.get('/admin', function(req,res){
		res.render('adminIndex.ejs');
	});

	router.get('/login', function(req,res){
		res.render('loginIndex.ejs' , {message: req.flash('error')});
	});

	app.get('/', [ middleware.isLoggedIn() ], function(req,res){
		 res.render('adminIndex.ejs');
	});

	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/login');
	});


	app.use('/', router);
};