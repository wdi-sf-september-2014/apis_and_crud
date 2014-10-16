// install required node modules
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	request = require('request');

// create middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(methodOverride('_method'));

// handle user pulling up site's root
app.get('/', function(req, res) {
	request( {
		method: 'GET',
		uri: 'http://daretodiscover.net/wine'
	}, function(error, response, body) {
		res.render('inventory.ejs', {
			allWines: JSON.parse(body)
		});
	});
});

// render page for adding new wine
app.get('/new', function(req, res) {
	res.render('new.ejs');
});

// pass information from new wine form to 
// Arun's site
app.post("/new", function(req, res) {
    request({
        method: "POST",
        uri: "http://daretodiscover.net/wine",
        formData: {
        	name: req.body.winename,
            year: req.body.year,
            grapes: req.body.grapes,
            country: req.body.country,
            region: req.body.region,
            description: req.body.description,
            price: req.body.price
        }
    }, function(error, response, body) {
        res.redirect("/new");
    });
});

// render wine edit page
app.get('/edit/:id', function(req, res) {
	request({
		method: 'GET',
		uri: 'http://daretodiscover.net/wine/' + req.params.id
	}, function(error, response, body) {
		res.render('edit.ejs', {
			oneWine: JSON.parse(body)
		});
	});
});

// handle user editing wine info
app.put('/edit/:id', function(req, res) {
	request({
		method: 'PUT',
		uri: 'http://daretodiscover.net/wine/' + req.params.id,
		formData: {
			name: req.body.name,
			year: req.body.year,
			grapes: req.body.grapes,
			country: req.body.country,
			region: req.body.region,
			description: req.body.description,
			price: req.body.price
		}
	}, function(error, response, body) {
		res.redirect("/");
	});
});

// delete wine
app.delete('/delete/:id', function(req, res) {
	request({
		method: 'DELETE',
		uri: 'http://daretodiscover.net/wine/' + req.params.id
	}, function(error, response, body) {
		res.redirect('/');
	});
});


// listen for the port
app.listen(3000);