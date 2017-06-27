var express = require('express');
var app = express();
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var sequelize = new Sequelize('workoutlog', 'postgres', 'It#RainsAllDay3342', {
	host: 'localhost',
	dialect: 'postgres'
});
// this code will be migrated to a differt file soon.
sequelize.authenticate().then(
	function(){
		console.log('connected to workoutlog postgres db');
	},
	function(err){
		console.log(err);
	}
);

var User = seq.define('user', {
	username: Sequelize.STRING,
	passwordhash:
});

app.use(require('./middleware/headers'));

app.use('/api/test', function(req, res){
	res.send("<h1>Hello World</h1>" + "<h2>It's a small world</h2>");
});

app.listen(3000, function(){
	console.log("app is listening on 3000");
});
