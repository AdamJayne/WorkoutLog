// Helps create routes
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');
var User = sequelize.import('./models/user');
require('dotenv').config();

sequelize.sync();
//  User.sync({force:true})

app.use(bodyParser.json());
// middleware below
app.use(require('./middleware/headers'));

app.use(require('./middleware/validate-session'));
//  Create a user route
app.use('/api/user', require('./routes/user'));
//  Log into as a user
app.use('/api/login', require('./routes/sessions'));
//  Create a definition
app.use('/api/definition', require('./routes/definition')); 
//   Create a workout log
app.use('/api/log', require('./routes/log'));


app.use('/api/test', function(req, res){
	res.send("<h1>Hello World</h1>" + "<h2>It's a small world</h2>");
});

app.listen(3000, function(){
	console.log("app is listening on 3000");
});


// Challenge go to postman, create a new user, then login with that user

