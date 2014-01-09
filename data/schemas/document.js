/**
 * Created with JetBrains WebStorm.
 * User: allendolph
 * Date: 1/9/14
 * Time: 10:24 AM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');

function extractKeywords(text) {
    if (!text) return [];

    return text.
        split(/\s+/).
        filter(function(v) { return v.length > 2; }).
        filter(function(v, i, a) { return a.lastIndexOf(v) === i; });
};

var DocumentSchema = new mongoose.Schema({
    'title': { type: String, index: true },
    'data': String,
    'tags': [String],
    'keywords': [String],
    'user_id': mongoose.Schema.ObjectId
});

DocumentSchema.virtual('id')
    .get(function() {
        return this._id.toHexString();
    });

DocumentSchema.pre('save', function(next) {
    this.keywords = extractKeywords(this.data);
    next();
});

module.exports = DocumentSchema;