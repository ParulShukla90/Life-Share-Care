var AuthController = {

	authenticate: function(req, res, next) {
		console.log("in Authenticate" , req.body);
		// body...
		res.redirect("/admin")
		// res.json({"OK":"ok"});
	}

}
module.exports = AuthController;