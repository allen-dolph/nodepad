/**
 * Created with JetBrains WebStorm.
 * User: allendolph
 * Date: 1/9/14
 * Time: 4:54 PM
 * To change this template use File | Settings | File Templates.
 */
var User = require('../data/models/user');

module.exports = function(app) {
    // Users
    app.get('/users/new', function(req, res) {
        res.render('users/new.jade', {
            locals: { user: new User() }
        });
    });

    app.post('/users.:format?', function(req, res) {
        var user = new User(req.body.user);

        function userSaveFailed() {
            req.flash('error', 'Account creation failed');
            res.render('users/new.jade', {
                locals: { user: user }
            });
        }

        user.save(function(err) {
            if (err) return userSaveFailed();

            req.flash('info', 'Your account has been created');
            emails.sendWelcome(user);

            switch (req.params.format) {
                case 'json':
                    res.send(user.toObject());
                    break;

                default:
                    req.session.user_id = user.id;
                    res.redirect('/documents');
            }
        });
    });

    app.post('/api/v1/users.:format?', function(req, res) {

    });
};