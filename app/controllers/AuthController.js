var models = require("../models");
var AuthController = {

	authenticate: function(req, res, next) {
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
	},
	getAgencySession : function(req,res){
		if (req.isAuthenticated()){
			if (req.user && req.user.typeId == 3){
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
	},
	directories : function(req,res){
		if (req.isAuthenticated()){
			console.log("******************\n\n",{user_id:req.user.typeId})
			models.directory.findAll({where:{user_id:req.user.typeId}}).then(function(dirData){
				res.status(200).json(dirData);
			}).catch(function(error) {
				outputJson = {
				   msg       : error
				};
			    res.status(401).json(outputJson);
			});  
		}else{
			res.status(401).json({
				error: "Not Authenticated "
			})
		}
	}

}
module.exports = AuthController;