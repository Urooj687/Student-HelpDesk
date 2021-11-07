const express = require('express');
const router = express.Router();
const countries = require('./parsed-countries')

router.get('/', listCountries);
router.get('/:country/states', listStates);
router.get('/:country/states/:state/cities', listCities);
module.exports = router;

function listCountries(req, res) {
	res.send(Object.keys(countries));
}


function listStates(req, res) {
	const country = req.params.country;
	if (!countries[country]) return res.status(404).send("No country found");
	res.send(Object.keys(countries[country].states));
}
function listCities(req, res) {
	const country = req.params.country;
	const state = req.params.state;
	if (!countries[country] || !countries[country].states[state]) return res.status(404).send("No state found");
	res.send(countries[country].states[state].cities || []);
}