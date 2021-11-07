var express = require('express');
var router = express.Router();

// router.get('/', list);
router.get('/', show);
// router.post('/', create);
router.put('/', update);
// router.delete('/:id', remove);
module.exports = router;




var StudentModel = require('../student/student.model');



function show(req, res) {
	const id = res.locals.user.id;
	StudentModel.findOne({
		_id: id
	})
		.exec(function (err, Student) {
			if (err) {
				return res.status(500).json({
					message: 'Error when getting PersonalInfo.',
					error: err
				});
			}
			if (!Student || !Student.personalInfo) {
				return res.status(404).json({
					message: 'No such Student'
				});
			}
			return res.json(Student.personalInfo);
		});
}

function update(req, res) {
	const id = res.locals.user.id;
	StudentModel.findOne({
		_id: id
	}, function (err, Student) {
		if (err) {
			return res.status(500).json({
				message: 'Error saving Student',
				error: err
			});
		}
		if (!Student) {
			return res.status(404).json({
				message: 'No such Student'
			});
		}

		Student.personalInfo.firstName = req.body.FirstName ? req.body.FirstName : Student.personalInfo.firstName;
		Student.personalInfo.middleName = (req.body.MiddleName != undefined) ? req.body.MiddleName : Student.personalInfo.middleName;
		Student.personalInfo.lastName = req.body.LastName ? req.body.LastName : Student.personalInfo.lastName;
		Student.personalInfo.gender = req.body.Gender ? req.body.Gender : Student.personalInfo.gender;
		Student.personalInfo.maritalStatus = req.body.MaritalStatus ? req.body.MaritalStatus : Student.personalInfo.maritalStatus;
		Student.personalInfo.dateOfBirth = req.body.DateOfBirth ? req.body.DateOfBirth : Student.personalInfo.dateOfBirth;
		Student.personalInfo.nationality = req.body.Nationality ? req.body.Nationality : Student.personalInfo.nationality;
		Student.personalInfo.birthCountry = req.body.BirthCountry ? req.body.BirthCountry : Student.personalInfo.birthCountry;
		Student.personalInfo.birthState = req.body.BirthState ? req.body.BirthState : Student.personalInfo.birthState;
		Student.personalInfo.birthCity = req.body.BirthCity ? req.body.BirthCity : Student.personalInfo.birthCity;
		Student.personalInfo.idCard = req.body.IdCard ? req.body.IdCard : Student.personalInfo.idCard;
		Student.personalInfo.otherCitizenship = req.body.OtherCitizenship ? req.body.OtherCitizenship : Student.personalInfo.otherCitizenship

		Student.save(function (err, Student) {
			if (err) {
				return res.status(500).json({
					message: 'Error saving student.'
				});
			}
			return res.json(Student.personalInfo);
		});
	});
}
