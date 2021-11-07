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
				message: 'Error when getting internship experience.',
				error: err
			});
		}
		if (!student || !student.educationInfo) {
			return res.status(404).json({
				message: 'No such Student'
			});
		}
		return res.json(student.educationInfo);
	})
}

function show(req, res) {
	const sid = res.locals.user.id;
	const eid = req.params.eid;
	StudentModel.findOne({
		"_id": sid,
		"educationInfo._id": eid
	}, {
			"educationInfo.$.": 1
		})
		.exec(function (err, student) {
			if (err) {
				return res.status(500).json({
					message: 'Error when getting Education info.',
					error: err
				});
			}
			if (!student || !student.educationInfo || student.educationInfo.length <= 0) {
				return res.status(404).json({
					message: 'No such Student'
				});
			}
			return res.json(student.educationInfo[0]);
		})
}

function add(req, res) {
	const id = res.locals.user.id;
	const educationInfo = {
		country: req.body.country,
		state: req.body.state,
		city: req.body.city,
		institution: req.body.institution,
		educationType: req.body.educationType,
		field: req.body.field,
		status: req.body.status,
		start: req.body.start,
		end: req.body.end,
		grade: {
			gradeType: req.body.grade.gradeType,
			total: req.body.grade.total,
			obtained: req.body.grade.obtained
		}

	}
	StudentModel.update(
		{ _id: id },
		{
			$push: {
				educationInfo: educationInfo
			}
		},
		function (err, student) {
			if (err) {
				return res.status(500).json({
					message: 'Error when updating internship experience.',
					error: err
				});
			}
			return res.json(student.educationInfo);
		})
}
function remove(req, res) {
	const sid = res.locals.user.id;
	const eid = req.params.eid;
	StudentModel.update(
		{ _id: sid },
		{
			$pull: {
				educationInfo: { _id: eid }
			}
		},
		function (err, student) {
			if (err) {
				return res.status(500).json({
					message: 'Error when updating internship experience.',
					error: err
				});
			}
			return res.json(student.educationInfo);
		})
}

function update(req, res) {
	const sid = res.locals.user.id;
	const eid = req.params.eid;
	const educationInfo = {
		country: req.body.country,
		state: req.body.state,
		city: req.body.city,
		institution: req.body.institution,
		educationType: req.body.educationType,
		field: req.body.field,
		status: req.body.status,
		start: req.body.start,
		end: req.body.end,
		grade: {
			gradeType: req.body.grade.gradeType,
			total: req.body.grade.total,
			obtained: req.body.grade.obtained
		}
	}

	StudentModel.updateOne(
		{ _id: sid, "educationInfo._id": eid },
		{
			$set: {
				"educationInfo.$.country": educationInfo.country,
				"educationInfo.$.state": educationInfo.state,
				"educationInfo.$.city": educationInfo.city,
				"educationInfo.$.institution": educationInfo.institution,
				"educationInfo.$.educationType": educationInfo.educationType,
				"educationInfo.$.field": educationInfo.field,
				"educationInfo.$.status": educationInfo.status,
				"educationInfo.$.start": educationInfo.start,
				"educationInfo.$.end": educationInfo.end,
				"educationInfo.$.grade.gradeType": educationInfo.grade.gradeType,
				"educationInfo.$.grade.total": educationInfo.grade.total,
				"educationInfo.$.grade.obtained": educationInfo.grade.obtained,
			}
		},
		function (err, student) {
			if (err) {
				return res.status(500).json({
					message: 'Error when updating internship experience.',
					error: err
				});
			}
			return res.json(student.educationInfo);
		}
	)

}