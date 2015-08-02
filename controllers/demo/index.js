var demo = require('../../models/demo');

exports.all = function(req,res,next){
	demo.get({},function(data){
		res.json(data);
	});
};

exports.add = function(req,res,next){
	var name = req.params.name;
	demo.add(name,function(data){
		res.json(data);
	});
};

exports.remove = function(req,res,next){
	var name = req.params.name;
	demo.remove(name,function(data){
		res.json(data);
	});
};