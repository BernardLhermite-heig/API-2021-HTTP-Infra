var Chance = require('chance');
var chance = new Chance();
var os = require("os");

var express = require('express');
var app = express();

app.use(function (req, res, next) {
	res.header("hostname", os.hostname());
	next();
});

app.get('/', function(req, res) {
	res.send(getPrize());
});

app.listen(3000, function() {
	console.log('Accepting HTTP requests on port 3000.');
});

function getPrize() {
	return {
		name: chance.word({ syllables: 3 }),
		value: chance.euro({min : 10, max: 1000000})
	}
}
