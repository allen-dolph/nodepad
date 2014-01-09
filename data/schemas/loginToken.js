/**
 * Created with JetBrains WebStorm.
 * User: allendolph
 * Date: 1/9/14
 * Time: 10:26 AM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose'),
    crypto = require('crypto');

LoginTokenSchema = new mongoose.Schema({
    email: { type: String, index: true },
    series: { type: String, index: true },
    token: { type: String, index: true }
});

LoginTokenSchema.method('randomToken', function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
});

LoginTokenSchema.pre('save', function(next) {
    // Automatically create the tokens
    this.token = this.randomToken();

    if (this.isNew)
        this.series = this.randomToken();

    next();
});

LoginTokenSchema.virtual('id')
    .get(function() {
        return this._id.toHexString();
    });

LoginTokenSchema.virtual('cookieValue')
    .get(function() {
        return JSON.stringify({ email: this.email, token: this.token, series: this.series });
    });

module.exports = LoginTokenSchema;