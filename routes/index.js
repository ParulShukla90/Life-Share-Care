module.exports = function(app, express, passport) {
	var router = express.Router();
	var path = require('path');
	router.get('/admin', function(req,res){
		console.log( ">>	        " , path.join(__dirname +'/../public/adminIndex.html'))
		res.sendFile(path.join(__dirname +'/../public/adminIndex.html'));
	});
	router.get('/login', function(req,res){
		console.log( ">>	        " , __dirname +'/../public/adminIndex.html')
		res.sendFile(path.join(__dirname +'/../public/loginIndex.html'));
	});
	app.use('/', router);
};