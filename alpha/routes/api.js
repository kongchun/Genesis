var express = require('express');
var read = require('../server/read.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('login');
});


router.post('/login', function(req, res, next) {
	var user = {
		account: req.body.account,
		password: req.body.password
	};
	read.checkUser(user).then(function(data) {
		req.session.user = data.data;
		res.send(data);
	})
});

router.get("/logout", function(req, res, next) {
	req.session.user = null;
	res.send({
		result: true
	});
})

module.exports = router;