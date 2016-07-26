var models = require("../models");
var UUID = require('uuid-js');
var moment = require("moment");
var mailer = require('./mailer')
var bcrypt = require('bcryptjs');

/*________________________________________________________________________
* @Date:      		21 july 2016
* @Method :   		addInvite 
* Created By: 		smartData Enterprises Ltd
* Modified On:		-
* @Purpose:   		To add a new store.
_________________________________________________________________________
*/
var addInvite = function(req,res){
    if(req.body.email_id && req.body.first_name){
        var data = {
            email: req.body.email_id,
            name: req.body.first_name,
            token : UUID.create().toString(),
            expired_on : new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            status : true
        }
        //console.log(data.expired_on)
        var link = 'https://203.100.79.82:8000/invite/'+data.token;
        var html = "Hello, <br/><br/> This is an informatory mail. Life Share care admin has invited you to join lifesharecare.com as an agency. Please visit the following link to register with us :<br/><br/><a href='"+link+"'>" +link+ "</a><br/><br/><small>*Please note that the link will expire in 24 hours.</small><br/><br/>  Thank you,<br/> Life Share Care Team";
        var subject = "Invitation to register as agency at lifesharecare.com";
        mailer.sendMail( req.body.email_id, html, subject, function(error){
            if(error){
                outputJson = {
                    msg       : "There was some error! Email was not sent.",
                    error: error
                }
                res.status(400).json(outputJson);
            }else{
                console.log(data);
                var agency = models.invite.build(data)
                .save().then(function(){
                     getAllInvites(req,res);  
                }).catch(function(error) {
                     outputJson = {
                        msg       : error
                    }
                    res.status(400).json(outputJson);
                });
            }
        });   
        
    }else{
        outputJson = {
            msg       : "Please provide valid information"
        }
        res.status(400).json(outputJson);
    }
};
exports.addInvite = addInvite;
    
/*________________________________________________________________________
* @Date:      		21 july 2016
* @Method :   		getAllInvites 
* Created By: 		smartData Enterprises Ltd
* Modified On:		-
* @Purpose:   		Fetch all invitations sent.
_________________________________________________________________________
*/
var getAllInvites = function(req,res){
    models.invite.findAll({ order: '"createdAt" DESC' }).then(function(data){
        if(!data){
            data =[]    
        }
        outputJson = {
           data       : data
        };
       res.status(200).json(outputJson);
    }).catch(function(error) {
        outputJson = {
           msg       : error
        };
       res.status(401).json(outputJson);
   });    
}
exports.getAllInvites = getAllInvites;

/*________________________________________________________________________
* @Date:            21 july 2016
* @Method :         inviteProcess 
* Created By:       smartData Enterprises Ltd
* Modified On:      -
* @Purpose:         Invitation process.
_________________________________________________________________________
*/
var inviteProcess = function(req, res, next) {

    var inviteId = req.params.inviteId;
    if (!inviteId) res.redirect("/login");

    models.invite.findOne({
        where: {
            token: inviteId,
            status : true
        }
    }).then(function(data) {
        if (!data) {
            // TODO - SEND FLASH MESSAGE FROM HERE 
            req.flash('error', 'Invalid Token');
            return res.redirect("/login");
        }
        // TODO - Check expiration data from here . 
        var now = new moment();
        tokenDate = moment(data.dataValues.expired_on);
        if (tokenDate.diff(now) < 0) {
            req.flash('error', 'Your invitation has expired ');
            res.redirect("/login");
        }
        data.dataValues.inviteId = inviteId ; 
        res.render("registration.ejs",{"data" : data.dataValues }) ; 
    }).catch(function(error) {
        // :: TODO - Send flash message from here 
        req.flash('error', error );
        res.redirect("/login");
    });
}
exports.inviteProcess = inviteProcess;



/*________________________________________________________________________
* @Date:            21 july 2016
* @Method :         registration 
* Created By:       smartData Enterprises Ltd
* Modified On:      -
* @Purpose:         Agency Invitation process.
_________________________________________________________________________
*/
var registration = function(req, res, next) {

    var inviteId = req.body.inviteId;
    if (!inviteId || !req.body.password || !req.body.first_name || !req.body.username || !req.body.email) return res.status(400).json({
        msg: "Please provide valid information"
    });
    models.invite.findOne({
        where: {
            token: inviteId
        }
    }).then(function(invitationObj) {
        if (!invitationObj) {
            res.status(400).json({
                msg: "Invalid token"
            });
        }
        
        var now = new moment();
        tokenDate = moment(invitationObj.dataValues.expired_on);
        console.log("tokenDate", tokenDate.diff(now));
        if (tokenDate.diff(now) < 0) {
            res.status(400).json({
                msg: "Your invitation has expired"
            });
        }
        //check here if user is already registered 
        models.users.findOne({
            where: {
                email_id: req.body.email
            }
        }).then(function(data) {
            if (data) return res.status(400).json({
                msg: "Already register"
            });
            models.users.findOne({
                where: {
                    user_name: req.body.username
                }
            }).then(function(data) {
                if (data) return res.status(400).json({
                    msg: "Username already exists! Please try with some other username."
                });
                
                // SaveInfo 
                var agencyObj = {
                    typeId: 3,
                    email_id: req.body.email,
                    first_name: req.body.first_name,
                    user_name: req.body.username,
                    phone_number: req.body.phno
                }
                models.users_password.build({
                        "user_password": req.body.password
                    }).save()
                    .then(function(passwordObj) {
                        agencyObj.pswdId = passwordObj.dataValues.id;
                        models.users.build(agencyObj)
                            .save().then(function(data) {
                                    console.log('\n\n6\n\n');
                                    var salt = bcrypt.genSaltSync(data.dataValues.id%10);
                                    var hash = bcrypt.hashSync(req.body.password, salt );
                                        passwordObj.user_password = hash;
                                        passwordObj.user_id = data.dataValues.id ;
                                        passwordObj.save().then(function() { "passwordObj Updated"});
                                        invitationObj.status = false;
                                        invitationObj.save();
                                        res.json({
                                            data: data
                                        });
                            }).catch(function(error) {
                                outputJson = {
                                    msg: error
                                }
                                res.status(401).json(outputJson);
                            });
                    })
                    .catch(function(error) {
                        outputJson = {
                            msg: error
                        }
                        res.status(401).json(outputJson);
                    })
            }).catch(function(error1) {
                outputJson = {
                    msg: error1
                }
                res.status(401).json(outputJson);
            });
        });

    }).catch(function(error) {
        outputJson = {
            msg: error
        }
        res.status(401).json(outputJson);
    });


}
exports.registration = registration; 