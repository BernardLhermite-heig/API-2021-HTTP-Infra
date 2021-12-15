var Chance = require('chance');
var chance = new Chance();

var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send( money() );
});

app.listen(3000, function() {
	console.log('Accepting HTTP requests on port 3000.');
});

function money() {
	var argent = chance.euro({min : 1000000000, max: 1000000000000});
	var mot = chance.word({ syllables: 3 })
	var phrase = "Félicitations ! Vous avez gagné un " + mot + " d'une valeur de " + argent + ". ";
	return phrase;
}
