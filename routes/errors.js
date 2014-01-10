/**
 * Created with JetBrains WebStorm.
 * User: allendolph
 * Date: 1/9/14
 * Time: 5:05 PM
 * To change this template use File | Settings | File Templates.
 */
// Error handling
var util = require('util');

util.inherits(NotFound, Error);

function NotFound(msg) {
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}

module.exports = function(app) {
    app.get('/404', function(req, res) {
        throw new NotFound;
    });

    app.get('/500', function(req, res) {
        throw new Error('An expected error');
    });

    app.get('/bad', function(req, res) {
        unknownMethod();
    });

    app.error(function(err, req, res, next) {
        if (err instanceof NotFound) {
            res.render('404.jade', { status: 404 });
        } else {
            next(err);
        }
    });
};