const express = require('express');
const router = express.Router();
const AdmissionsModel = require('../admissions/admissions.model');



router.post('/', add);
router.get('/', list);
module.exports = router;



function list(req, res) {
	const id = res.locals.user.id;
	const sort = req.query.sort || "start";
	const order = req.query.order || -1;
	const page = req.query.page || 1;
	let admissions = [];

	const sortQuery = {};
	sortQuery[sort] = order;
	AdmissionsModel
		.find({ instituteId: id })
		.sort(sortQuery)
		.skip(page * 30)
		.limit(30)
		.then(data => {
			if (!data) {
				return res.status(404).send("Nothing found");
			}
			admissions = data;
			return AdmissionsModel.find({ instituteId: id }).count();
		})
		.then(count => {
			const response = {
				admissions: admissions,
				total: count
			}
			res.status(200).send(response);
		})
		.catch(error => {
			return res.status(500).json({
				message: 'SOmething went wrong. Please try again later',
				error: err
			});
		})
}


function add(req, res) {
	const id = res.locals.user.id;
	const admission = {
		instituteId: id,
		title: req.body.title,
		categories: req.body.categories,
		charges: req.body.charges,
		start: req.body.start,
		end: req.body.end
	}
	AdmissionsModel.create(admission)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch(error => {
			res.status(500).send("Something went wrong");
		})
}
