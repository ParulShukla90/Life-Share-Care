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
	
	router.get('/agency', function(req,res){
		res.render('agencyIndex.ejs');
	});

	app.get('/', [ middleware.isLoggedIn() ], function(req,res){
		 if (req.isAuthenticated()){
			if (req.user && req.user.typeId == 3){
				res.render('agencyIndex.ejs');
			}else if(req.user && req.user.typeId == 1){
				res.render('adminIndex.ejs');
			}else{
				res.render('loginIndex.ejs');
			}
		}else{
			res.render('loginIndex.ejs');
		}
	});

	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/login');
	});


	app.use('/', router);
};