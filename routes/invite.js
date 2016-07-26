module.exports = function(app, express, passport) {
	var middleware = require("./../app/policies/auth");
	var agencyObj = require('./../app/controllers/agencyController.js');
	var router = express.Router();
	router.post('/add',	[ middleware.isApiLoggedIn(), middleware.isAdmin() ] ,  agencyObj.addInvite);
	router.get('/getAll',	agencyObj.getAllInvites);
	router.get('/:inviteId',	agencyObj.inviteProcess );
	router.post('/registration',	 agencyObj.registration);

	app.use('/invite', router);
};