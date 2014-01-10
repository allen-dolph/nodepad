/**
 * Created with JetBrains WebStorm.
 * User: allendolph
 * Date: 1/9/14
 * Time: 4:51 PM
 * To change this template use File | Settings | File Templates.
 */
var User = require('../../data/models/user');

function authenticateFromLoginToken(req, res, next) {
    var cookie = JSON.parse(req.cookies.logintoken);

    LoginToken.findOne({ email: cookie.email,
        series: cookie.series,
        token: cookie.token }, (function(err, token) {
        if (!token) {
            res.redirect('/sessions/new');
            return;
        }

        User.findOne({ email: token.email }, function(err, user) {
            if (user) {
                req.session.user_id = user.id;
                req.currentUser = user;

                token.token = token.randomToken();
                token.save(function() {
                    res.cookie('logintoken', token.cookieValue, { expires: new Date(Date.now() + 2 * 604800000), path: '/' });
                    next();
                });
            } else {
                res.redirect('/sessions/new');
            }
        });
    }));
}

module.exports = authenticateFromLoginToken;