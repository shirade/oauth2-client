var passport = require('./../lib/passport');

/* GET home page. */
exports.index = function (req, res) {
  req.isUnauthenticated() ? res.render('index') : res.render('home', { profile: req.user.profile });
};

exports.signin = passport.authenticate('provider');

exports.callback = passport.authenticate('provider', { successRedirect: '/', failureRedirect: '/' });

exports.signout = function (req, res) {
  req.logout();
  res.redirect('/');
};
