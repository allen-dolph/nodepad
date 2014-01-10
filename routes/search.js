/**
 * Created with JetBrains WebStorm.
 * User: allendolph
 * Date: 1/9/14
 * Time: 5:01 PM
 * To change this template use File | Settings | File Templates.
 */
var loadUser = require('./middleware/loadUser'),
    Document = require('../data/models/document');

module.exports = function(app) {
    // Search
    app.post('/search.:format?', loadUser, function(req, res) {
        Document.find({ user_id: req.currentUser.id, keywords: req.body.s },
            function(err, documents) {
                console.log(documents);
                console.log(err);
                switch (req.params.format) {
                    case 'json':
                        res.send(documents.map(function(d) {
                            return { title: d.title, id: d._id };
                        }));
                        break;

                    default:
                        res.send('Format not available', 400);
                        break;
                }
            });
    });
};