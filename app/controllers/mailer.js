var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'lifesharecare.ben@gmail.com',
		pass: 'BeN#lsc@2016'
	}
});

var sendMail = function(email,link,callback) {
	var mailOptions = {
		from: "Life Share Care", 
		to: email, 
		subject: "Invitation to register as agency at lifesharecare.com",
		html: "Hello, <br/><br/> This is an informatory mail. Life Share care admin has invited you to join lifesharecare.com as an agency. Please visit the following link to register with us :<br/><br/>" +link+ "<br/><br/>*Please note that the link will expire in 24 hours.<br/><br/>  Thank you,<br/> Life Share Care Team"
	};
	console.log("mailOptions", mailOptions);
	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log("email error", error);
            callback(error);
		} else {
			console.log('Message sent: ' + info.response);
            callback(null)
		}
	});
}
exports.sendMail = sendMail;