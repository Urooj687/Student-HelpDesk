const express = require('express');
const router = express.Router();
const StudentModel = require('../student/student.model');


router.get('/', list);
router.get('/:eid', show);
router.post('/', add);
router.put('/:eid', update);
router.delete('/:eid', remove);
module.exports = router;

function list(req, res) {
	const id = res.locals.user.id;
	StudentModel.findById(id, function (err, student) {
		if (err) {
			return res.status(500).json({
				message: 'Error when getting work experience.',
				error: err
			});
		}
		if (!student || !student.personalInfo) {
			return res.status(404).json({
				message: 'No such Student'
			});
		}
		return res.json(student.workExperiences);
	})
}

function show(req, res) {
	const sid = res.locals.user.id;
	const eid = req.params.eid;
	StudentModel.findOne({
		"_id": sid,
		"workExperiences._id": eid
	}, {
			"workExperiences.$.": 1
		})
		.exec(function (err, student) {
			if (err) {
				return res.status(500).json({
					message: 'Error when getting work experience.',
					error: err
				});
			}
			if (!student || !student.workExperiences || student.workExperiences.length <= 0) {
				return res.status(404).json({
					message: 'No such Student'
				});
			}
			return res.json(student.workExperiences[0]);
		})
}

function add(req, res) {
	const id = res.locals.user.id;
	const workExperience = {
		country: req.body.country,
		company: req.body.company,
		designation: req.body.designation,
		position: req.body.position,
		working: req.body.working,
		start: req.body.start,
		end: req.body.end,
		details: req.body.details
	}
	StudentModel.update(
		{ _id: id },
		{
			$push: {
				workExperiences: workExperience
			}
		},
		function (err, student) {
			if (err) {
				return res.status(500).json({
					message: 'Error when updating work experience.',
					error: err
				});
			}
			return res.json(student.workExperiences);
		})
}
function remove(req, res) {
	const sid = res.locals.user.id;
	const eid = req.params.eid;
	StudentModel.update(
		{ _id: sid },
		{
			$pull: {
				workExperiences: { _id: eid }
			}
		},
		function (err, student) {
			if (err) {
				return res.status(500).json({
					message: 'Error when updating work experience.',
					error: err
				});
			}
			return res.json(student.workExperiences);
		})
}

function update(req, res) {
	const sid = res.locals.user.id;
	const eid = req.params.eid;
	const workExperience = {
		country: req.body.country,
		company: req.body.company,
		designation: req.body.designation,
		position: req.body.position,
		working: req.body.working,
		start: req.body.start,
		end: req.body.end,
		details: req.body.details
	}
	StudentModel.updateOne(
		{ _id: sid, "workExperiences._id": eid },
		{
			$set: {
				"workExperiences.$.country": workExperience.country,
				"workExperiences.$.company": workExperience.company,
				"workExperiences.$.designation": workExperience.designation,
				"workExperiences.$.position": workExperience.position,
				"workExperiences.$.working": workExperience.working,
				"workExperiences.$.start": workExperience.start,
				"workExperiences.$.end": workExperience.end,
				"workExperiences.$.details": workExperience.details
			}
		},
		function (err, student) {
			if (err) {
				return res.status(500).json({
					message: 'Error when updating work experience.',
					error: err
				});
			}
			return res.json(student.workExperiences);
		}
	)

}