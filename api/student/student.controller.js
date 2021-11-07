var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', list);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);
module.exports = router;




var StudentModel = require('./student.model.js');




function list(req, res) {
	StudentModel.find(function (err, Students) {
		if (err) {
			return res.status(500).json({
				message: 'Error getting Student.'
			});
		}
		return res.json(Students);
	});
}

function show(req, res) {
	var id = req.params.id;
	StudentModel.findOne({
			_id: id
		})
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
			return res.json(Student);
		});
}

function create(req, res) {
	if (req.body.email && req.body.password) {
		bcrypt.hash(req.body.password, 10, function (err, hash) {
			if (err) {
				return res.sendStatus(500);
			}
			var Student = new StudentModel({
				"email": req.body.email,
				"password": hash
			});
			Student.save(function (err, Student) {
				if (err) {
					return res.status(500).json({
						message: 'Error saving Student',
						error: err
					});
				}
				return res.json({
					message: 'saved',
					_id: Student._id
				});
			});
		});
	} else {
		res.sendStatus(400);
	}
}

function update(req, res) {
	var id = req.params.id;
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

		Student.email = req.body.email ? req.body.email : Student.email;
		Student.password = req.body.password ? req.body.password : Student.password

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

function remove(req, res) {
	var id = req.params.id;
	StudentModel.findByIdAndRemove(id, function (err, Student) {
		if (err) {
			return res.status(500).json({
				message: 'Error getting Student.'
			});
		}
		return res.json(Student);
	});
}
