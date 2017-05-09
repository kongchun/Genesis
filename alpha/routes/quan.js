var express = require('express');
var router = express.Router();
var read = require('../server/read.js');
var write = require('../server/write.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.redirect('/quan/invite/590ac16bd4b6571d3848d3ba');
});

router.get('/invite/:id', function(req, res, next) {

	var id = req.params.id;
	
	read.getMarketingById(id).then(function(marketing){
		if(marketing &&　marketing.status == 1){


			//write.updateMarketingViewCountById(id);

			//如果活动进行中 那就提供活动界面
			res.render('quan/invite', {
				marketing:marketing
			});
			
		}else{
			res.render('quan/finish', {
				marketing:marketing
			});
		}
	})
});


router.get('/list', function(req, res, next) {
	res.redirect('../quan_list.html');
});

router.get('/manager', function(req, res, next) {
	res.redirect('../quan_manager.html');
});

module.exports = router;