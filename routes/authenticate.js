module.exports = function(app, express, passport) {
	var middleware = require("./../app/policies/auth");
	var loginObj = require('./../app/controllers/AuthController.js');
	var router = express.Router();
	router.post('/login',	passport.authenticate('local-login', {failureRedirect: '/login' ,  failureFlash : true	}),	loginObj.authenticate);
	router.get('/getAdminSession',	loginObj.getAdminSession);
	router.get('/getAgencySession',	loginObj.getAgencySession); 
	router.get('/directories',	loginObj.directories); 
	app.use('/auth', router);

};