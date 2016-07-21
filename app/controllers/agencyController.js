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
    if(req.body.email_id){
        
        console.log(req.body);
        var data = {
            email: req.body.email_id,
            token : UUID.create().toString(),
            expired_on : new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
            //expired_on : new Date()
        }
        mailer.sendMail(req.body.email_id,'https://52.39.212.226:5666/'+data.token,function(error){
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
                    res.status(401).json(outputJson);
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
    models.invite.findAll().then(function(data){
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
            token: inviteId
        }
    }).then(function(data) {
        if (!data) {
            // TODO - SEND FLASH MESSAGE FROM HERE 
            req.flash('message', 'Invalid Token');
            return res.redirect("/login");
        }
        // TODO - Check expiration data from here . 
        var now = new moment();
        tokenDate = moment(data.dataValues.expired_on);
        if (tokenDate.diff(now) < 0) {
            req.flash('message', 'Your invitation is being expired ');
            res.redirect("/login");
        }
        data.dataValues.inviteId = inviteId ; 
        res.render("registration.ejs",{"data" : data.dataValues }) ; 

    }).catch(function(error) {
        // :: TODO - Send flash message from here 
        req.flash('message', error );
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
    if (!inviteId || !req.body.password || !req.body.first_name || !req.body.last_name || !req.body.email) return res.status(400).json({
        msg: "Please provide valid information"
    });
    models.invite.findOne({
        where: {
            token: inviteId
        }
    }).then(function(data) {
        if (!data) {
            res.status(400).json({
                msg: "Invalid token"
            });
        }

        var now = new moment();
        tokenDate = moment(data.dataValues.expired_on);
        console.log("tokenDate", tokenDate.diff(now));
        if (tokenDate.diff(now) < 0) {
            res.status(400).json({
                msg: "Your invitation is being expired"
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
            // SaveInfo 
            var agencyObj = {
                typeId: 3,
                email_id: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
            }
            models.users_password.build({
                    "user_password": req.body.password
                }).save()
                .then(function(passwordObj) {
                    agencyObj.pswdId = passwordObj.dataValues.id;
                    models.users.build(agencyObj)
                        .save().then(function(data) {
                                var salt = bcrypt.genSaltSync(10);
                                var hash = bcrypt.hashSync(req.body.password, salt );
                                    passwordObj.user_password = hash;
                                    passwordObj.save().then(function() { "passwordObj Updated"});
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
        });

    }).catch(function(error) {
        req.flash('message', error);
        res.redirect("/login");
    });


}
exports.registration = registration; 