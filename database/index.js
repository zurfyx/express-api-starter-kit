var mongo = require('mongodb'),
	monk = require('monk'),
	db = monk('localhost:27017/demo');

module.exports = db;