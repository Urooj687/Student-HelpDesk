const express = require('express');
const router = express.Router();
const StudentModel = require('../student/student.model');

router.get('/:id', list);
router.get('/:sid/:eid', show);
router.post('/:id', add);
router.put('/:sid/:eid', update);
router.delete('/:sid/:eid', remove);
module.exports = router;

function list(req, res) {
	const id = req.params.id;
	StudentModel.findById(id, function (err, student) {
		if (err) {
			return res.status(500).json({
				message: 'Error when getting internship experience.',
				error: err
			});
		}
		if (!student || !student.internshipExperiences) {
			return res.status(404).json({
				message: 'No such Student'
			});
		}
		return res.json(student.internshipExperiences);
	})
}

function show(req, res) {
	const sid = req.params.sid;
	const eid = req.params.eid;
	StudentModel.findOne({
		"_id": sid,
		"internshipExperiences._id": eid
	}, {
			"internshipExperiences.$.": 1
		})
		.exec(function (err, student) {
			if (err) {
				return res.status(500).json({
					message: 'Error when getting internship experience.',
					error: err
				});
			}
			if (!student || !student.internshipExperiences || student.internshipExperiences.length <= 0) {
				return res.status(404).json({
					message: 'No such Student'
				});
			}
			return res.json(student.internshipExperiences[0]);
		})
}

function add(req, res) {
	const id = req.params.id;
	const internshipExperience = {
		country: req.body.country,
		company: req.body.company,
		duration: req.body.duration,
		subject: req.body.subject
		
	}
	StudentModel.update(
		{ _id: id },
		{
			$push: {
				internshipExperiences: internshipExperience
			}
		},
		function (err, student) {
			if (err) {
				return res.status(500).json({
					message: 'Error when updating internship experience.',
					error: err
				});
			}
			return res.json(student.internshipExperiences);
		})
}
function remove(req, res) {
	const sid = req.params.sid;
	const eid = req.params.eid;
	StudentModel.update(
		{ _id: sid },
		{
			$pull: {
				internshipExperiences: { _id: eid }
			}
		},
		function (err, student) {
			if (err) {
				return res.status(500).json({
					message: 'Error when updating internship experience.',
					error: err
				});
			}
			return res.json(student.internshipExperiences);
		})
}

function update(req, res) {
	const sid = req.params.sid;
	const eid = req.params.eid;
	const internshipExperience = {
		country: req.body.country,
		company: req.body.company,
		duration: req.body.duration,
		subject: req.body.subject
	}
	StudentModel.updateOne(
		{ _id: sid, "internshipExperiences._id": eid },
		{
			$set: {
				"internshipExperiences.$.country": internshipExperience.country,
				"internshipExperiences.$.company": internshipExperience.company,
				"internshipExperiences.$.duration": internshipExperience.duration,
				"internshipExperiences.$.subject": internshipExperience.subject
			}
		},
		function (err, student) {
			if (err) {
				return res.status(500).json({
					message: 'Error when updating internship experience.',
					error: err
				});
			}
			return res.json(student.internshipExperiences);
		}
	)

}