var db = require('../../database');

function insert(name,callback){
	db.get('user').insert({'user':name}, function(e, result){
		if(e) return callback({'error':e});

		return callback(result);
	});
};

exports.get = function(filter,callback){
	db.get('user').find(filter,{sort:{'user':1},fields:{'_id':0}}, function(e,docs){
		if(e) return callback({'error':e});
		
		return callback(docs);
	});
};

exports.add = function(name,callback){
	exports.get({'user':name},function(data){
		if(data.error != null) return callback(data);
		if(data != '') return callback({'error':'duplicate'}); //entry already exists

		insert(name,function(data){
			return callback(data);
		});
	});
};

exports.remove = function(name,callback){
	db.get('user').remove({'user':name}, function(e, result){
		if(e) return callback({'error':e});

		return callback({});
	});
};