module.exports = function(app, express, passport) {
	var loginObj = require('./../app/controllers/AuthController.js');
	var router = express.Router();
	router.post('/login',	passport.authenticate('local-login', {failureRedirect: '/login'	}),	loginObj.authenticate);
	app.use('/auth', router);

};