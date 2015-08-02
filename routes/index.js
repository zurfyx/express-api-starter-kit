var express = require('express'),
  	router = express.Router();

router.use('/', require('./landing'));
router.use('/demo', require('./demo'));

module.exports = router;