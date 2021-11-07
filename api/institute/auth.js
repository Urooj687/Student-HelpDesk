const express = require('express');
const router = express.Router();
const InstituteModel = require('./institute.model');
const bcrypt = require('bcrypt');
const myPrivateKey = "DrIFOD55QZhK4ZeXIdtcR3NoWmdV9nr0";
const jwt = require('jsonwebtoken');
module.exports = {
	router: router,
	verify: verify
};

router.post('/login', function (req, res) {
	if (req.body.email && req.body.password) {
		InstituteModel.findOne({
			"email": req.body.email,
		}).exec(function (err, Institute) {
			if (err || !Institute) {
				return res.sendStatus(400);
			} else {
				bcrypt.compare(req.body.password, Institute.password, function (err, passed) {
					if (err || !passed) {
						return res.sendStatus(500);
					}
					jwt.sign({
						"id": Institute._id,
						"role": "institute"
					}, myPrivateKey, {
							expiresIn: '1d'
						}, function (err, token) {
							if (err) {
								console.log(err);

								return res.sendStatus(500);
							}
							res.json({
								"token": token,
								"id": Institute._id
							});
						});
				});

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
			res.locals.user = jwt.decode(token, { complete: true }).payload;
			return next();
		}
	});
}
