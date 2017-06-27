var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js')
var User = sequelize.import('./models/user');

User.sync();
//  User.sync({force:true})

app.use(bodyParser.json());

app.use('/api/user', require('./routes/user'));

app.use(require('./middleware/headers'));

app.use('/api/test', function(req, res){
	res.send("<h1>Hello World</h1>" + "<h2>It's a small world</h2>");
});

app.listen(3000, function(){
	console.log("app is listening on 3000");
});