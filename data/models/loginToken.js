/**
 * Created with JetBrains WebStorm.
 * User: allendolph
 * Date: 1/9/14
 * Time: 10:26 AM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var LoginTokenSchema = require('../schemas/loginToken');

var LoginToken = mongoose.model('LoginToken', LoginTokenSchema);

module.exports = LoginToken;