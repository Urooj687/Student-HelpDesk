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
			return res.json(Student.contactInfo);
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

		Student.contactInfo.differentPermanent = (req.body.differentPermanent != undefined) ? req.body.differentPermanent : Student.contactInfo.differentPermanent;
		Student.contactInfo.phone = req.body.phone ? req.body.phone : Student.contactInfo.phone;
		Student.contactInfo.mobile = req.body.mobile ? req.body.mobile : Student.contactInfo.mobile;

		Student.contactInfo.currentAddress.country = req.body.currentAddress.country ? req.body.currentAddress.country : Student.contactInfo.permanentAddress.country;
		Student.contactInfo.currentAddress.state = req.body.currentAddress.state ? req.body.currentAddress.state : Student.contactInfo.permanentAddress.state;
		Student.contactInfo.currentAddress.city = req.body.currentAddress.city ? req.body.currentAddress.city : Student.contactInfo.permanentAddress.city;
		Student.contactInfo.currentAddress.address = req.body.currentAddress.address ? req.body.currentAddress.address : Student.contactInfo.permanentAddress.address;
		Student.contactInfo.currentAddress.postalCode = req.body.currentAddress.postalCode ? req.body.currentAddress.postalCode : Student.contactInfo.permanentAddress.postalCode

		Student.contactInfo.permanentAddress.country = req.body.permanentAddress.country ? req.body.permanentAddress.country : Student.contactInfo.permanentAddress.country;
		Student.contactInfo.permanentAddress.state = req.body.permanentAddress.state ? req.body.permanentAddress.state : Student.contactInfo.permanentAddress.state;
		Student.contactInfo.permanentAddress.city = req.body.permanentAddress.city ? req.body.permanentAddress.city : Student.contactInfo.permanentAddress.city;
		Student.contactInfo.permanentAddress.address = req.body.permanentAddress.address ? req.body.permanentAddress.address : Student.contactInfo.permanentAddress.address;
		Student.contactInfo.permanentAddress.postalCode = req.body.permanentAddress.postalCode ? req.body.permanentAddress.postalCode : Student.contactInfo.permanentAddress.postalCode
		

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
