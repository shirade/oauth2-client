var passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var request = require('request');
var qs = require('querystring');

var oAuth2Strategy = new OAuth2Strategy({
    authorizationURL: process.env.OAUTH_AUTHORIZATION_URL,
    tokenURL: process.env.OAUTH_ACCESS_TOKEN_URL,
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: process.env.OAUTH_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, {
      accessToken: accessToken,
      profile: profile
    });
  }
);

oAuth2Strategy.userProfile = function (accessToken, done) {
  request.get({
    // jshint camelcase:false
    url: process.env.OAUTH_PROFILE_URL + '?' + qs.stringify({ access_token: accessToken }),
    json: true
  }, function (err, res, profile) {
    done(err, profile);
  });
};

passport.use('provider', oAuth2Strategy);

passport.serializeUser(function (accessToken, done) {
  done(null, accessToken);
});

passport.deserializeUser(function (accessToken, done) {
  done(null, accessToken);
});

module.exports = passport;
