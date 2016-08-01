/*
 *This is common module which will be used to send mails
*/

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'lifesharecare.ben@gmail.com',
		pass: 'BeN#lsc@2016'
	}
});

var sendMail = function(email,html,subject,callback) {
	var mailOptions = {
		from: "Life Share Care", 
		to: email, 
		subject: subject,
		html: html
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