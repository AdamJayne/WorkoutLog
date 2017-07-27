var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user.js');
var Definition = sequelize.import('../models/definition.js');
var Log = sequelize.import('../models/log.js');

router.post('/', function(req, res){
	var description = req.body.log.description;
	var result = req.body.log.result;
	var user = req.user;
	var definition = req.body.log.def;
// To find the fields that will be populated, look at the model to find the rows that will be populated.
	Log.create({
		description: description,
		result: result,
		owner: user.id,
		def: definition
	}).then(
		function createSucces(log){
			res.json(log);
		},
		function createError(err){
			res.send(500, err.message);
		}
	)
});

router.get('/', function(req, res){
	var userid = req.user.id;

	Log.findAll({ where: {owner: userid}}).then(
			function findAllSuccess(data){
				res.json(data)
			},
			function findAllError(err){
				res.send(500, err.message)
			}
		)
});

router.get('/:id', function(req,res){
	var data=req.params.id;
	console.log(data);
	Log
		.findOne({
			where: {id: data}
		}).then(
			function getSuccess(updateData){
				res.json(updateData);
			},
			function getError(err){
				res.send(500, err.message);
			}
		);
});

router.put('/', function(req, res){
	var description = req.body.log.desc;
	var result = req.body.log.id;
	var data = req.body.log.id;
	var definition = req.body.log.def;
	consol.log(req);
	Log
		.update(
		{
			description: description,
			result: result,
			def: definition
		},
		{where: {id: data}}
		).then(
			function updateSuccess(updatedLog){
				res.json(updatedLog);
			},
			function updateError(err){
				res.send(500, err.message);
			}
		);
});

router.delete('/', function(req, res){
	var data = req.body.log.id;

	Log.destroy({ where: {id: data}}).then(
			function deleteLogSuccess(data){
				res.send("You removed a log!");
			},
			function deleteLogError(err){
				res.send(500, err.message);
			}
		);
});

router.get('/:id', function(req,res){
	var dataID = req.params.id;

	Log.findOne({ where : {id: dataID }}).then(
			function getSuccess(data){
				res.json(data)
			},
			function getError(err){
				res.send(500, err.message)
			}
		)
});

router.put('/', function(req, res){
	var description = req.body.log.description;
	var result = req.body.log.result;
	var data = req.body.log.id;
	var definition = req.body.log.def;

	Log.update({
		description : description,
		result : result,
		def : definition
	}, { where: {id: data}}).then(
		function updateSuccess(updateData){
			res.json(updateData);
		},
		function updateError(err){
			res.send(500, err.message)
		}
	)

})
module.exports = router;