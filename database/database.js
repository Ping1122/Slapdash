const debug = require('debug')('database:main');
const mongoose = require('mongoose');
const blueBird = require('bluebird');
const userModel = require('./UserSchema.js').user;
const eventModel = require('./EventSchema.js').event;

module.exports.databaseInit = databaseInit;

var mongoConnection;
/**
 * Perform initialization for database module
 */
function databaseInit () {
	mongoConnection = mongoose.connect('mongodb://localhost/slapdashdb');
	 mongoose.Promise = blueBird;
	debug('Initialized MongoDB: ' + mongoConnection);
}