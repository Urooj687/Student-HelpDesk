const express = require('express');
const router = express.Router();
const StudentModel = require('../student/student.model.js');
const bcrypt = require('bcrypt');
const myPrivateKey = "DrIFOD55QZhK4ZeXIdtcR3NoWmdV9nr0";
const jwt = require('jsonwebtoken');
module.exports = {
	router: router,
	verify: verify
};


router.post('/login', function (req, res) {

	if (req.body.email && req.body.password) {
		StudentModel.findOne({
			"email": req.body.email,
		}).exec(function (err, Student) {
			if (err || !Student) {
				return res.sendStatus(400);
			} else {
				
					jwt.sign({
						"id": Student._id,
						"role": "student"
					}, myPrivateKey, {
							expiresIn: '1d'
						}, function (err, token) {
							if (err) {
								console.log(err);

								return res.sendStatus(500);
							}
							res.json({
								"token": token,
								"id": Student._id
							});
						});
				// });

			}
		});

	} else {
		res.sendStatus(400);
	}
});





function verify(req, res, next) {
	const authorization = req.headers['authorization'];
	if (!authorization || typeof authorization !== "string" || !authorization.indexOf(" ") > 0) {
		return res.status(401).json({
			"message": "token is required in header"
		});
	}
	const token = authorization.split(" ")[1];
	jwt.verify(token, myPrivateKey, function (err, decoded) {
		if (err) {
			return res.status(401).json({
				"message": err.message
			});
		} else {
			res.locals.user = jwt.decode(token, {complete: true}).payload;
			return next();
		}
	});

}
