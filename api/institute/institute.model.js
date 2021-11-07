var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InstituteSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	location: {
		country: {
			type: String,
			required: true
		},
		city: {
			type: String,
			required: true
		},
		address: String
	}	
});

module.exports = mongoose.model('Institute', InstituteSchema);
