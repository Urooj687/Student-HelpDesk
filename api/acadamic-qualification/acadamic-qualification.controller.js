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
		if (!student || !student.acadamicQualifications) {
			return res.status(404).json({
				message: 'No such Student'
			});
		}
		return res.json(student.acadamicQualifications);
	})
}

function show(req, res) {
	const sid = res.locals.user.id;
	const eid = req.params.eid;
	StudentModel.findOne({
		"_id": sid,
		"acadamicQualifications._id": eid
	}, {
			"acadamicQualifications.$.": 1
		})
		.exec(function (err, student) {
			if (err) {
				return res.status(500).json({
					message: 'Error when getting internship experience.',
					error: err
				});
			}
			if (!student || !student.acadamicQualifications || student.acadamicQualifications.length <= 0) {
				return res.status(404).json({
					message: 'No such Student'
				});
			}
			return res.json(student.acadamicQualifications[0]);
		})
}

function add(req, res) {
	const id = res.locals.user.id;
	const acadamicQualification = {
		examName: req.body.examName,
		country: req.body.country,
		date: req.body.date,
		grade: req.body.grade
		
	}
	StudentModel.update(
		{ _id: id },
		{
			$push: {
				acadamicQualifications: acadamicQualification
			}
		},
		function (err, student) {
			if (err) {
				return res.status(500).json({
					message: 'Error when updating internship experience.',
					error: err
				});
			}
			return res.json(student.acadamicQualifications);
		})
}
function remove(req, res) {
	const sid = res.locals.user.id;
	const eid = req.params.eid;
	StudentModel.update(
		{ _id: sid },
		{
			$pull: {
				acadamicQualifications: { _id: eid }
			}
		},
		function (err, student) {
			if (err) {
				return res.status(500).json({
					message: 'Error when updating internship experience.',
					error: err
				});
			}
			return res.json(student.acadamicQualifications);
		})
}

function update(req, res) {
	const sid = res.locals.user.id;
	const eid = req.params.eid;
	const acadamicQualification = {
		examName: req.body.examName,
		country: req.body.country,
		date: req.body.date,
		grade: req.body.grade
	}
	StudentModel.updateOne(
		{ _id: sid, "acadamicQualifications._id": eid },
		{
			$set: {
				"acadamicQualifications.$.examName": acadamicQualification.examName,
				"acadamicQualifications.$.country": acadamicQualification.country,
				"acadamicQualifications.$.date": acadamicQualification.date,
				"acadamicQualifications.$.grade": acadamicQualification.grade
			}
		},
		function (err, student) {
			if (err) {
				return res.status(500).json({
					message: 'Error when updating internship experience.',
					error: err
				});
			}
			return res.json(student.acadamicQualifications);
		}
	)

}