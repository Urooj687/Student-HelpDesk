var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const PersonalInfo = require('./api/personal-info/personal-info.controller');
const ContactInfo = require('./api/contact-info/contact-info.controller');
const FamilyInfo = require('./api/family-info/family-info.controller');
const WorkExperience = require('./api/work-experience/work-experience.controller');
const InternshipExperience = require('./api/internship-experience/internship-experience.controller');
const AcadamicQualification = require('./api/acadamic-qualification/acadamic-qualification.controller');
const EducationInfo = require('./api/education-info/education-info.controller');
const Student = require('./api/student/student.controller');
const Institute = require('./api/institute/institute.controller');
const Auth = require('./api/auth/auth');
const countries = require('./api/country/country.controller')

var mongoose = require('./database/mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/api/personal-info', Auth.verify, PersonalInfo);
app.use('/api/contact-info', Auth.verify, ContactInfo);
app.use('/api/family-info', Auth.verify, FamilyInfo);
app.use('/api/work-experience', Auth.verify, WorkExperience);
app.use('/api/internship-experience', Auth.verify, InternshipExperience);
app.use('/api/acadamic-qualification', Auth.verify, AcadamicQualification);
app.use('/api/education-info', Auth.verify, EducationInfo);
app.use('/api/countries', countries);
app.use('/api/student', Student);
app.use('/api/institute', Institute);
app.use('/api/auth', Auth.router);
app.use('/student', express.static(__dirname + '/builds/student'));
app.use('/institute', express.static(__dirname + '/builds/institute'));


// start server on the specified port and binding host
app.listen(8080, '0.0.0.0', function () {
	// print a message when the server starts listening
	console.log("server starting on 8080");
});


// process.on('uncaughtException', function (err) {
// 	console.log('Caught exception: ' + err);
// });

// test