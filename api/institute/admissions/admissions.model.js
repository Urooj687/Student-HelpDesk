var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdmissionsSchema = new Schema({
	instituteId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Institute",
		required: true
	},
	title: {
		type: String,
		required: true
	},
	categories: [String],
	charges: {
		type: Number,
		required: true
	},
	start: {
		type: Date,
		required: true
	},
	end: {
		type: Date,
		required: true
	}
});

module.exports = mongoose.model('Admissions', AdmissionsSchema);
