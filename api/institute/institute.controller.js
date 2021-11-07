const express = require('express');
const router = express.Router();
const auth = require('./auth');
const admissions = require('./admissions/admissions.controller');

router.use('/auth', auth.router);
router.use('/admissions', auth.verify, admissions);



module.exports = router;