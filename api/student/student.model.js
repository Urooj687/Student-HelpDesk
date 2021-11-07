var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	personalInfo: {
		firstName: String,
		middleName: String,
		lastName: String,
		gender: String,
		maritalStatus: String,
		dateOfBirth: Date,
		nationality: String,
		birthCountry: String,
		birthState: String,
		birthCity: String,
		idCard: String,
		otherCitizenship: String
	},
	familyInfo: {
		father: {
			name: String,
			alive: Boolean,
			occupation: String,
			position: String,
			working: Boolean,
			company: String
		},
		mother: {
			name: String,
			alive: Boolean,
			occupation: String,
			position: String,
			working: Boolean,
			company: String
		},
		totalSiblings: Number,
		maritalStatus: String,
		monthlyIncome: Number
	},
	contactInfo: {
		phone: Number,
		mobile: Number,
		differentPermanent: Boolean,
		currentAddress: {
			country: String,
			state: String,
			city: String,
			postalCode: String,
			address: String
		},
		permanentAddress: {
			country: String,
			state: String,
			city: String,
			postalCode: String,
			address: String
		}
	},
	educationInfo: [{
		country: String,
		state: String,
		city: String,
		institution: String,
		educationType: String,
		field: String,
		status: Boolean,
		start: Date,
		end: Date,
		grade: {
			gradeType: String,
			total: Number,
			obtained: Number
		}
	}],
	workExperiences: [{
		country: String,
		company: String,
		designation: String,
		position: String,
		working: Boolean,
		start: Date,
		end: Date,
		details: String
	}],
	internshipExperiences: [{
		country: String,
		company: String,
		duration: Number,
		subject: String
	}],
	acadamicQualifications: [{
		examName: String,
		country: String,
		date: Date,
		grade: Number
	}]
});

module.exports = mongoose.model('Student', StudentSchema);
