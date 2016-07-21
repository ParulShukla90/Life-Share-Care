exports.isLoggedIn = function() {
	return function(req, res, next) {
		if (req.isAuthenticated()) return next();
			  req.flash('message', 'session expired! Please logged in again');	
			  res.redirect("/login")
	}
}


exports.isApiLoggedIn = function(){
	return function(req, res, next) {
		if (req.isAuthenticated()) return next();
		return res.status(401).json({
			error: "Not Authenticated "
		})
	}	
}

exports.isAdmin = function() {
	return function(req, res, next) {
		if (req.user && req.user.typeId == 1) return next();
		return res.status(401).json({
			error: "Not Authenticated "
		})
	}
}

