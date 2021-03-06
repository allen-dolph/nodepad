/**
 * Created with JetBrains WebStorm.
 * User: allendolph
 * Date: 1/9/14
 * Time: 10:25 AM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose'),
    crypto = require('crypto');

function validatePresenceOf(value) {
    return value && value.length;
}

var UserSchema = new mongoose.Schema({
    'email': { type: String, validate: [validatePresenceOf, 'an email is required'], index: { unique: true } },
    'hashed_password': String,
    'salt': String
});

UserSchema.virtual('id')
    .get(function() {
        return this._id.toHexString();
    });

UserSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() { return this._password; });

UserSchema.method('authenticate', function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
});

UserSchema.method('makeSalt', function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
});

UserSchema.method('encryptPassword', function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
});

UserSchema.pre('save', function(next) {
    if (!validatePresenceOf(this.password)) {
        next(new Error('Invalid password'));
    } else {
        next();
    }
});

module.exports = UserSchema;