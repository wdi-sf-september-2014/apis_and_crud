var express = require("express"),
	app = express(),
	request = require("request"),
	bodyParser = require("body-parser");
	methodOverride = require("method-override")

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
	extended:true
}));

app.use(methodOverride("_method"));

//set public directory so CSS linking works
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	request({
		method: "GET",
		uri: "http://daretodiscover.net/wine/"
	}, function(error, response, body) {
		res.render("index.ejs", {
			allWines:JSON.parse(body)
		});
	});
});

app.get('/new', function(req, res) {
	res.render("new.ejs")
});

app.post('/new', function(req, res) {
	request({
		method: "POST",
		uri: "http://daretodiscover.net/wine/",
		formData: {
			name:req.body.name,
			year:req.body.year,
			grapes:req.body.grapes,
			country:req.body.country,
			region:req.body.region,
			description:req.body.description,
			price:req.body.price
		}
	}, function(error, response, body) {
		res.redirect('/');
	});
});

app.get('/edit/:id', function(req, res) {
	request({
		method: "GET",
		uri: "http://daretodiscover.net/wine/" + req.params.id
	}, function(error, response, body) {
		res.render("edit.ejs", {
			wine:JSON.parse(body)
		});
	});
});

app.put('/edit/:id', function(req, res) {
	request({
		method: "PUT",
		uri: "http://daretodiscover.net/wine/" + req.params.id,
		formData: {
			name:req.body.name,
			year:req.body.year,
			grapes:req.body.grapes,
			country:req.body.country,
			region:req.body.region,
			description:req.body.description,
			price:req.body.price
		}
	}, function(error, response, body) {
		res.redirect('/');
	});
});

app.delete('/delete/:id', function(req, res) {
	request({
		method: "DELETE",
		uri: "http://daretodiscover.net/wine/" + req.params.id,
	}, function(error, response, body) {
		res.redirect('/');
	});
});

app.listen(3000);