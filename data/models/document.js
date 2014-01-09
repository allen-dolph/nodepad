/**
 * Created with JetBrains WebStorm.
 * User: allendolph
 * Date: 1/9/14
 * Time: 10:24 AM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var DocumentSchema = require('../schemas/document');

var Document = mongoose.model('Document', DocumentSchema);

module.exports = Document;