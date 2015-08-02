var express = require('express'),
	router = express.Router(),
	demo = require('../controllers/demo');

router.get('/', function(req,res){
	res.redirect('all');
});
router.get('/all', demo.all);
router.get('/add/:name', demo.add);
router.get('/remove/:name', demo.remove);

module.exports = router;