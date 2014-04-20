var express = require('express');
var port = process.env.PORT || 3002;
var app = express();
var mongoose = require('mongoose');
var Photo = require('./models/photo.js');
 

app.configure('development', function(){
	mongoose.connect('mongodb://admin:admin@oceanic.mongohq.com:10096/ionic-api');
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
	mongoose.connect('mongodb://admin:admin@oceanic.mongohq.com:10096/ionic-api');
    app.use(express.errorHandler()); 
});

app.listen(port, function() {
  console.log("Instagraaaam API is Listening on " + port);
});

app.get('/getPhotos', function(req, res) {
		
	Photo.find(function(err, photo) {
		if (err) { throw err; }

		res.send(photo);
  	});
});

app.post('/postPhoto', function(req, res) {

	photo = new Photo({
	  title: req.body.title,
	  content: req.body.content,
	  url: req.body.url
	});

	photo.save(function(err) {
		if (err) { throw err; }

		res.send(photo);
	});
});