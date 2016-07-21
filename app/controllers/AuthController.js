var AuthController = {

	authenticate: function(req, res, next) {
		// :: TODO - Switch in between Admin  / Subscribers 
		res.redirect("/")
	},

	index: function(req, res, next){
		res.sendFile(path.join(__dirname +'/../../public/adminIndex.html'));
	},
	getAdminSession : function(req,res){
		if (req.isAuthenticated()){
			if (req.user && req.user.typeId == 1){
				res.status(200).json({
					msg: "Authenticated "
				})
			}else{
				res.status(401).json({
					error: "Not Authenticated "
				})
			}
		}else{
			res.status(401).json({
				error: "Not Authenticated "
			})
		}
	}

}
module.exports = AuthController;