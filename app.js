var express = require('express');
var session = require('express-session');
var path = require('path');

var passport = require('./lib/passport');
var sign = require('./routes/sign');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', sign.index);
app.get('/signin', sign.signin);
app.get('/signout', sign.signout);
app.get('/callback', sign.callback);

module.exports = app;
