var express = require('express');
var router = express.Router();

router.get('/', show);
router.put('/', update);
module.exports = router;




var StudentModel = require('../student/student.model.js');
function show(req, res) {
	const id = res.locals.user.id;
	StudentModel.findOne({ _id: id })
		.exec(function (err, Student) {
			if (err) {
				return res.status(500).json({
					message: 'Error when getting Student.',
					error: err
				});
			}
			if (!Student) {
				return res.status(404).json({
					message: 'No such Student'
				});
			}
			return res.json(Student.familyInfo);
		});
}

function update(req, res) {
	const id = res.locals.user.id;
	StudentModel.findOne({ _id: id }, function (err, Student) {
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

		Student.familyInfo.father.name = req.body.father.name ? req.body.father.name : Student.familyInfo.father.name;
		Student.familyInfo.father.alive = (typeof req.body.father.alive !== "undefined") ? req.body.father.alive : Student.familyInfo.father.alive;
		Student.familyInfo.father.occupation = req.body.father.occupation ? req.body.father.occupation : Student.familyInfo.father.occupation;
		Student.familyInfo.father.position = req.body.father.position ? req.body.father.position : Student.familyInfo.father.position;
		Student.familyInfo.father.working = (typeof req.body.father.working !== "undefined") ? req.body.father.working : Student.familyInfo.father.working;
		Student.familyInfo.father.company = req.body.father.company ? req.body.father.company : Student.familyInfo.father.company;
		Student.familyInfo.mother.name = req.body.mother.name ? req.body.mother.name : Student.familyInfo.mother.name;
		Student.familyInfo.mother.alive = (typeof req.body.mother.alive !== "undefined") ? req.body.mother.alive : Student.familyInfo.mother.alive;
		Student.familyInfo.mother.occupation = req.body.mother.occupation ? req.body.mother.occupation : Student.familyInfo.mother.occupation;
		Student.familyInfo.mother.position = req.body.mother.position ? req.body.mother.position : Student.familyInfo.mother.position;
		Student.familyInfo.mother.working = (typeof req.body.mother.working !== "undefined") ? req.body.mother.working : Student.familyInfo.mother.working;
		Student.familyInfo.mother.company = req.body.mother.company ? req.body.mother.company : Student.familyInfo.mother.company;
		Student.familyInfo.totalSiblings = req.body.totalSiblings ? req.body.totalSiblings : Student.familyInfo.totalSiblings;
		Student.familyInfo.maritalStatus = req.body.maritalStatus ? req.body.maritalStatus : Student.familyInfo.maritalStatus;
		Student.familyInfo.monthlyIncome = req.body.monthlyIncome ? req.body.monthlyIncome : Student.familyInfo.monthlyIncome

		Student.save(function (err, Student) {
			if (err) {
				return res.status(500).json({
					message: 'Error getting Student.'
				});

			}
			if (!Student) {
				return res.status(404).json({
					message: 'No such Student'
				});
			}
			return res.json(Student);
		});
	});

}
