var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var db = require('./db.js');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var models = require("./app/models");

var app = express();

passport.use('local-login', new LocalStrategy(
  function(username, password, done) {
    // check in SEQUILIZE if a user with username exists or not
    models.users.findOne({
      include: [{
        model: models.users_password,
        attributes: ["user_password", "user_id"]
      }],
      where: {
        email_id: username
      }
    }, {
      attributes: ["id", "type_id", "email_id", "first_name", "last_name", "is_active"]
    }).then(function(user) {

      if (!user) {
        return done(null, false, {
          'message': 'User Not found.'
        });
      }

      if (!user.dataValues.users_password) {
        return done(null, false, {
          'message': 'User Password Not found.'
        });
      }

      // User exists but wrong password, log the error 
      if (!isValidPassword(user.dataValues.users_password.dataValues.user_password, password)) {
        return done(null, false, {
          'message': 'Invalid Password'
        }); // redirect back to login page
      }
      // User and password both match, return user from done method
      // which will be treated like success
      return done(null, user);
    });

  }));
  var isValidPassword = function(userPassword, password) {
    return bcrypt.compareSync(password, userPassword);
  }

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.users.findOne({
    where: {
      id: id
    }
  }, {
    attributes: ["id", "type_id", "email_id", "first_name", "last_name", "is_active"]
  }).then(function(user) {
    done(err, user);
  });
});



// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "LifeShareCare",
  proxy: true,
  resave: true,
  saveUninitialized: true
}));



// routes
require('./routes/index.js')(app, express, passport);
require('./routes/authenticate.js')(app, express, passport);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
module.exports = app;