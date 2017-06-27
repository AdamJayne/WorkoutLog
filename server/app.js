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

var User = sequelize.define('user', {
	username: Sequelize.STRING,
	passwordhash: Sequelize.STRING,
});

User.sync();
//  User.sync({force:true})

app.use(bodyParser.json());

app.post('/api/user', function(req, res){
	var username = req.body.user.username;
	var pass = req.body.user.password;
	User.create({
		username: username,
		passwordhash: ""
	}).then(
		function createSuccess(user){
			res.json({
				user: user,
				message: 'create'
			});
		},
		function createError(err){
			res.send(500, err.message);
		}
	);
});

app.use(require('./middleware/headers'));

app.use('/api/test', function(req, res){
	res.send("<h1>Hello World</h1>" + "<h2>It's a small world</h2>");
});

app.listen(3000, function(){
	console.log("app is listening on 3000");
});
